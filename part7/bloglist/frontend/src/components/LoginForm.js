import { useState } from "react";
import { useDispatch } from "react-redux";

import { setLoggedUser } from "../reducers/loggedUserReducer";
import { setNotification } from "../reducers/notificationReducer";

import {
  Box,
  Avatar,
  TextField,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { VisibilityOff, Visibility, Login } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const LoginForm = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);

    try {
      await dispatch(setLoggedUser(data.get("username"), data.get("password")));
      dispatch(setNotification("Successfully logged in"));
    } catch (exception) {
      setError(true);
      setLoading(false);
      if (exception.response.status === 401) {
        const text = exception.response.data.error;
        const error = true;
        dispatch(setNotification(text, error));
      } else {
        console.log(exception);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ height: 200, width: 200 }} />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            required
            error={error}
            margin="normal"
            label="Username"
            name="username"
            fullWidth
          />
          <TextField
            required
            error={error}
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />

          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<Login />}
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            login
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
