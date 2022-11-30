import { useEffect } from "react";

import "./Notification.css";

const Notification = ({ notification, handleSetNotification }) => {
  useEffect(() => {
    const notification = { text: "", error: false };
    const id = setInterval(() => handleSetNotification(notification), 5000);

    return () => clearInterval(id);
  }, [notification, handleSetNotification]);

  if (!notification.text) {
    return;
  }

  return (
    <div className={"notification " + (notification.error && "error")}>
      {notification.text}
    </div>
  );
};

export default Notification;
