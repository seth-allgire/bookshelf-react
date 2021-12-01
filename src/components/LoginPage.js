import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { BookContext } from "../shared/BookContext";
import {
  Button,
  Alert,
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { createTheme, ThemeProvider } from "@mui/material";
import useAxios from "../hooks/useAxios";

const theme = createTheme();

function LoginPage() {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(BookContext);
  const [userObj, setUserOjb] = useState(null);
  const { json, error: resError } = useAxios(
    "/api/users/login",
    "post",
    userObj
  );

  useEffect(() => {
    if (json && json.success) {
      setUser(json.data);
    }
  }, [setUser, json]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1A6A86" }}>
            <PersonOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  sx={{ mb: "3px" }}
                  error={error && (username.length < 4 || username.length > 20)}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  helperText="Username must be between 4 and 20 characters"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ mb: "3px" }}
                  error={error && (password.length < 8 || password.length > 20)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="Password must be between 8 and 20 characters"
                />
                <div className="error-container">
                  {resError && <Alert severity="error">{resError}</Alert>}
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: "15px",
                mb: 2,
                bgcolor: "#1A6A86",
                "&:hover": {
                  background: "#1a6986bb",
                },
              }}
              onClick={() => {
                if (username.length < 4 || password.length < 8) {
                  setError(true);
                  return;
                }
                setUserOjb({ username, password });
                setUser(username);
              }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink
                  to="/signup"
                  variant="body2"
                  style={{ color: "#1f2f53", textDecoration: "none" }}
                >
                  Don't have an account? Click here to Sign Up!
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
