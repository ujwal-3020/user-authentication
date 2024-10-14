import { toast } from "vue3-toastify";

function showToast(message, type = "success") {
  const config = {
    autoClose: 2000,
    position: "top-right",
    hideProgressBar: true,
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
