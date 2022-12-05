import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { resetNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      const id = setTimeout(() => dispatch(resetNotification()), 5000);
      return () => clearTimeout(id);
    }
  }, [notification, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!notification) {
    return;
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
