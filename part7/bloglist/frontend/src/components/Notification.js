import { useSelector } from "react-redux";

import "./Notification.css";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.text) {
    return (
      <div className={"notification " + (notification.error && "error")}>
        {notification.text}
      </div>
    );
  }
};

export default Notification;
