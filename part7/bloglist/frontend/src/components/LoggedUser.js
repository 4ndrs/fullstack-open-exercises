import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, IconButton, Tooltip } from "@mui/material";

import { resetLoggedUser } from "../reducers/loggedUserReducer";

const LoggedUser = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.loggedUser.name);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Typography>{name} logged in</Typography>
      <Tooltip title="Logout">
        <IconButton
          aria-label="logout"
          size="small"
          onClick={() => dispatch(resetLoggedUser())}
        >
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default LoggedUser;
