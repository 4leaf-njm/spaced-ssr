import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const confirm = (title, msg, callback, param = "") => {
  confirmAlert({
    title: title,
    message: msg,
    buttons: [
      {
        label: "취소",
        onClick: () => {
          return false;
        },
      },
      {
        label: "확인",
        onClick: () => callback(param),
      },
    ],
  });
};

export default confirm;
