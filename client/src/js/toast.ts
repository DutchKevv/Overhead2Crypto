
import $ from 'jquery'
import { Tooltip, Toast, Popover } from 'bootstrap';

declare let window: any;

export interface IToastOptions {
    text: String;
    type: 'success' | 'warning' | 'error'
}


export class ToastManager {

    toasts: any[] = [];

    show(options: IToastOptions) {
        const toast = `
<div class="toast show align-items-center text-white bg-${options.type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
<div class="d-flex">
  <div class="toast-body">
    Settings updated
  </div>
  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
</div>
`;

        const toastEl$ = $(toast);
        document.body.appendChild(toastEl$[0]);

        this.toasts.push(toastEl$);

        new Toast(toastEl$[0], {})
    }
}