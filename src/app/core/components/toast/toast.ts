import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IToast, ToastService } from '../../services';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  imports: [CommonModule],
})
export class Toast {
  public readonly toastService = inject(ToastService);

  getAlertClass(toast: IToast): string {
    const map: Record<string, string> = {
      success: 'alert-success',
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info',
    };
    return map[toast.type];
  }
}
