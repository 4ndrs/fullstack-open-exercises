import { useRef } from "react";
import { useSelector } from "react-redux";
import { Snackbar, Alert, Slide } from "@mui/material";

const Notification = () => {
  const id = useRef(null);
  const error = useRef(false);
  const notification = useSelector((state) => state.notification);

  if (notification.id !== null) {
    id.current = notification.id;
  }

  if (notification.error !== null) {
    error.current = notification.error;
  }

  const severity = error.current ? "error" : "success";
  const open = notification.id !== null ? Boolean(notification.text) : false;

  return (
    <Snackbar
      open={open}
      TransitionComponent={SlideTransition}
      key={id.current}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity}>{notification.text}</Alert>
    </Snackbar>
  );
};

const SlideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

export default Notification;
