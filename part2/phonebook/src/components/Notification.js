import "../Notification.css";

const Notification = ({ message }) => {
  if (!message) {
    return;
  }

  return <div className="green">{message}</div>;
};

export default Notification;
