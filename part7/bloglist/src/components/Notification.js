import "./Notification.css";

const Notification = ({ notification }) => {
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
