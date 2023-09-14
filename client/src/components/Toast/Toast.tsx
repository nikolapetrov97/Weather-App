import { useEffect } from "react";
import { toast } from "react-toastify";
import Toasts from "../../utils/globalHandlers/Toasts";

const Toast = (props: any) => {
  useEffect(() => {
    Toasts.toast = toast;
  }, []);

  return <>{props.children}</>;
};

export default Toast;
