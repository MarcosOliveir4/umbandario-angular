import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface IToast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  public readonly toasts = signal<IToast[]>([]);

  private add(message: string, type: ToastType, duration = 3500) {
    const id = crypto.randomUUID();
    this.toasts.update((t) => [...t, { id, message, type, duration }]);

    setTimeout(() => this.remove(id), duration);
  }

  remove(id: string) {
    this.toasts.update((t) => t.filter((toast) => toast.id !== id));
  }

  success(message: string, duration?: number) {
    this.add(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.add(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    this.add(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.add(message, 'info', duration);
  }
}
