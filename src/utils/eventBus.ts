type EventCallback<T = any> = (data: T) => void;

class EventBus {
  private events: Record<string, EventCallback[]> = {};

  // Suscribirse a un evento
  on<T = any>(event: string, callback: EventCallback<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback as EventCallback);
  }

  // Desuscribirse de un evento
  off<T = any>(event: string, callback: EventCallback<T>) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(
      (cb) => cb !== (callback as EventCallback)
    );
  }

  // Emitir un evento a todos los suscriptores
  emit<T = any>(event: string, data?: T) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  }
}

// Exportamos una única instancia (Singleton) para que toda la app use el mismo bus
export const eventBus = new EventBus();
