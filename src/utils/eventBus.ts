type EventCallback<T = any> = (data: T) => void;

class EventBus {
  private events: Record<string, EventCallback[]> = {};

  on<T = any>(event: string, callback: EventCallback<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback as EventCallback);
  }

  off<T = any>(event: string, callback: EventCallback<T>) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(
      (cb) => cb !== (callback as EventCallback),
    );
  }

  emit<T = any>(event: string, data?: T) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  }
}

export const eventBus = new EventBus();
