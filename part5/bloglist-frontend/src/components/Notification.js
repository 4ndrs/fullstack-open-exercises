import { useEffect } from "react";

import "./Notification.css";

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    const id = setInterval(
      () => setNotification({ text: "", error: false }),
      5000
    );

    return () => clearInterval(id);
  }, [notification, setNotification]);

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
