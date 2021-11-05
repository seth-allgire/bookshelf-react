import React from "react";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { Alert, Button, Input, InputLabel } from "@mui/material";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const { json } = useAxios("/api/users/signup", "post", userObj);

  return (
    <div>
      <InputLabel htmlFor="username">Username:</InputLabel>
      <Input
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        id="username"
        placeholder="enter username"
      ></Input>
      <div className="form-error">
        {error && username.length < 4 && (
          <Alert severity="error">Username must be at least 4 characters</Alert>
        )}
      </div>
      <InputLabel htmlFor="password">Password:</InputLabel>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        placeholder="enter password"
      ></Input>
      <div className="form-error">
        {error && password.length < 8 && (
          <Alert severity="error">Password must be at least 8 characters</Alert>
        )}
      </div>
      <InputLabel htmlFor="confPassword">Confirm Password:</InputLabel>
      <Input
        className="form-input"
        type="password"
        value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)}
        id="confPassword"
        placeholder="Password"
      ></Input>
      <div className="form-error">
        {error && password !== confPassword && (
          <Alert severity="error">Passwords do no match</Alert>
        )}
      </div>
      <Button
        variant="contained"
        onClick={() => {
          if (username.length < 4 || password.length < 8) {
            setError(true);
            return;
          }
          if (password !== confPassword) {
            setError(true);
            return;
          }
          setUserObj({ username, password });
        }}
      >
        Submit
      </Button>
      <div className="form-error">
        {json && json.error && <Alert severity="error">{json.error}</Alert>}
        {json && json.data && (
          <>
            <div className="form-container">
              <Alert severity="success">{json.data}</Alert>
            </div>
            <div className="form-container">
              <Button
                href="/login"
                variant="containedPrimary"
                sx={{ fontStyle: "normal" }}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
