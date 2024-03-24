import { ToastContainer, toast } from "react-toastify";

export const Alert = (type, msg) => {
  return toast[type](msg);
};
