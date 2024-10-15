import { toast } from "vue3-toastify";

function showToast(message, type = "success", onCloseCallback = null) {
  const config = {
    autoClose: 1500,
    position: "top-right",
    hideProgressBar: true,
    onClose: onCloseCallback,
  };

  if (type === "success") {
    toast.success(message, config);
  } else if (type === "error") {
    toast.error(message, config);
  } else if (type === "info") {
    toast.info(message, config);
  } else {
    toast(message, config);
  }
}

export default showToast;
