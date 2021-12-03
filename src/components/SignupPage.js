import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import {
  Alert,
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const { json, error: resError } = useAxios(
    "/api/users/signup",
    "post",
    userObj
  );

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
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
        <Avatar>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={error && (username.length < 4 || username.length > 20)}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                helperText="Username must be between 4 and 20 characters in length"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={error && (password.length < 8 || password.length > 20)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="Password must be between 8 and 20 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={error && password !== confPassword}
                name="confPassword"
                label="Confirm Password"
                type="password"
                id="confPassword"
                autoComplete="confirm-new-password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                helperText="Passwords must match"
              />
              <div className="error-container">
                {resError && <Alert severity="error">{resError}</Alert>}
                {json && json.data && (
                  <Alert severity="success">{json.data}</Alert>
                )}
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="containedPrimary"
            sx={{ mb: "10px" }}
            onClick={() => {
              if (
                username.length < 4 ||
                password.length < 8 ||
                password !== confPassword
              ) {
                setError(true);
                return;
              }

              setUserObj({ username, password });
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink
                to="/login"
                variant="body2"
                style={{
                  color: "#1f2f53",
                  textDecoration: "none",
                  paddingBottom: "70px",
                }}
              >
                Already have an account? Click here to Log In
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;
