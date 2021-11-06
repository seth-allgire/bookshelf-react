import React, { useState, useEffect, useContext } from "react";
import { BookContext } from "../shared/BookContext";
import { Button, Alert, Input, InputLabel } from "@mui/material";
import useAxios from "../hooks/useAxios";

function LoginPage() {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(BookContext);
  const [userObj, setUserOjb] = useState(null);
  const { json } = useAxios("/api/users/login", "post", userObj);

  useEffect(() => {
    if (json && json.success) {
      setUser(json.data);
    }
  }, [setUser, json]);

  return (
    <div>
      {" "}
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
      <Button
        variant="contained"
        onClick={() => {
          if (username.length < 4 || password.length < 8) {
            setError(true);
            return;
          }
          setUserOjb({ username, password });
          setUser(username);
        }}
      >
        Submit
      </Button>
      <div className="form-error">
        {json && <Alert severity="error">{json.error}</Alert>}
      </div>
      <div className="form-container">
        <div>Don't have an account?</div>
        <Button href="/createAcct" variant="contained">
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
