import "../Notification.css";

const Notification = ({ message, error }) => {
  if (!message) {
    return;
  }

  return <div className={`notification ${error && "error"}`}>{message}</div>;
};

export default Notification;
