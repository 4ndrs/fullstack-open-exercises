import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!notification.text) {
    return;
  }

  return <div style={style}>{notification.text}</div>;
};

export default Notification;
