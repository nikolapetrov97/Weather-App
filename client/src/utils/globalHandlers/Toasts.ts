export default class Toasts {
  static toast: any;

  static error(message: string) {
    if (Toasts.toast) {
      Toasts.toast.error(message, { position: "top-right", autoClose: 5000 });
    }
  }
  static success(message: string) {
    if (Toasts.toast) {
      Toasts.toast.success(message, { position: "top-right", autoClose: 5000 });
    }
  }
  static warning(message: string) {
    if (Toasts.toast) {
      Toasts.toast.warning(message, { position: "top-right", autoClose: 5000 });
    }
  }
  static info(message: string) {
    if (Toasts.toast) {
      Toasts.toast.info(message, { position: "top-right", autoClose: 5000 });
    }
  }
}
