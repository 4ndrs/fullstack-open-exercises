import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const severity = notification.error ? "error" : "success";
  const open = Boolean(notification.text);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity}>{notification.text}</Alert>
    </Snackbar>
  );
};

export default Notification;
