import { useEffect, useState, useRef, useCallback } from "react";

const LEADER_KEY_PREFIX = "app_tab_leader";
const HEARTBEAT_INTERVAL_MS = 1000;
const HEARTBEAT_TIMEOUT_MS = 2500;

export interface TabDetectionOptions {
  pageKey?: string;
}

export interface UseTabDetectionReturn {
  isDuplicate: boolean;
  takeOver: () => void;
}

interface LeaderEntry {
  tabId: string;
  ts: number;
}

function generateTabId(): string {
  return `tab_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function useTabDetection(
  options: TabDetectionOptions = {},
): UseTabDetectionReturn {
  const { pageKey = "default" } = options;
  const leaderKey = `${LEADER_KEY_PREFIX}_${pageKey}`;

  const tabId = useRef<string>(generateTabId());

  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isDuplicateRef = useRef<boolean>(false);

  isDuplicateRef.current = isDuplicate;

  const getLeader = useCallback((): LeaderEntry | null => {
    try {
      const raw = localStorage.getItem(leaderKey);
      return raw ? (JSON.parse(raw) as LeaderEntry) : null;
    } catch {
      return null;
    }
  }, [leaderKey]);

  const claimLeader = useCallback((): void => {
    const entry: LeaderEntry = { tabId: tabId.current, ts: Date.now() };
    localStorage.setItem(leaderKey, JSON.stringify(entry));
  }, [leaderKey]);

  const isCurrentTabLeader = useCallback((): boolean => {
    return getLeader()?.tabId === tabId.current;
  }, [getLeader]);

  const startHeartbeat = useCallback((): void => {
    if (heartbeatRef.current) return;
    heartbeatRef.current = setInterval(() => {
      if (isCurrentTabLeader()) {
        claimLeader();
      }
    }, HEARTBEAT_INTERVAL_MS);
  }, [claimLeader, isCurrentTabLeader]);

  const stopHeartbeat = useCallback((): void => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  }, []);

  const startWatchdog = useCallback((): void => {
    if (watchdogRef.current) return;

    watchdogRef.current = setInterval(() => {
      const leader = getLeader();

      if (!leader) {
        claimLeader();
        setIsDuplicate(false);
        startHeartbeat();
        return;
      }

      const age = Date.now() - leader.ts;

      if (leader.tabId === tabId.current) {
        if (isDuplicateRef.current) {
          setIsDuplicate(false);
          startHeartbeat();
        }
        return;
      }

      if (age > HEARTBEAT_TIMEOUT_MS) {
        claimLeader();
        setIsDuplicate(false);
        startHeartbeat();
      } else {
        if (!isDuplicateRef.current) {
          setIsDuplicate(true);
          stopHeartbeat();
        }
      }
    }, HEARTBEAT_INTERVAL_MS);
  }, [claimLeader, getLeader, startHeartbeat, stopHeartbeat]);

  const stopWatchdog = useCallback((): void => {
    if (watchdogRef.current) {
      clearInterval(watchdogRef.current);
      watchdogRef.current = null;
    }
  }, []);

  useEffect(() => {
    const leader = getLeader();
    const age = leader ? Date.now() - leader.ts : Infinity;
    const leaderAlive = !!leader && age < HEARTBEAT_TIMEOUT_MS;

    if (!leaderAlive) {
      claimLeader();
      setIsDuplicate(false);
      startHeartbeat();
    } else {
      setIsDuplicate(true);
    }

    startWatchdog();

    const handleUnload = (): void => {
      stopHeartbeat();
      stopWatchdog();
      if (isCurrentTabLeader()) {
        localStorage.removeItem(leaderKey);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      handleUnload();
    };
  }, [pageKey]);

  // ── takeOver ──────────────────────────────────────────────────────────────

  const takeOver = useCallback((): void => {
    claimLeader();
    setIsDuplicate(false);
    startHeartbeat();
  }, [claimLeader, startHeartbeat]);

  return { isDuplicate, takeOver };
}
