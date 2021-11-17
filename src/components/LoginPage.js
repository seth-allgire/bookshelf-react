import React, { useState, useEffect, useContext } from "react";
import { BookContext } from "../shared/BookContext";
import { Button, Alert } from "@mui/material";
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
      <div className="form-container">
        <div className="form-surround">
          <div className="form-container form-title">Login</div>
          <div className="form-container">
            <label className="form-label" htmlFor="username">
              Username:
            </label>
            <input
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              placeholder="enter username"
            ></input>
            <div className="form-error">
              {error && username.length < 4 && (
                <Alert
                  severity="error"
                  sx={{
                    height: "20px",
                    marginTop: "5px",
                    paddingBottom: "none",
                  }}
                >
                  Username must be at least 4 characters
                </Alert>
              )}
            </div>
            <div className="form-container">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="enter password"
              ></input>
              <div className="form-error">
                {error && password.length < 8 && (
                  <Alert
                    severity="error"
                    sx={{
                      height: "20px",
                      marginTop: "5px",
                      paddingBottom: "none",
                    }}
                  >
                    Password must be at least 8 characters
                  </Alert>
                )}
              </div>
              <Button
                variant="contained"
                sx={{ bgcolor: "#1a6a86", "&:hover": { bgcolor: "#248cb3" } }}
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
                <div>Need an account? Click here to</div>
                <Button
                  href="/createAcct"
                  variant="contained"
                  sx={{
                    bgcolor: "#d9eaf0",
                    boxShadow: "none",
                    color: "#1a6a86",
                    padding: "0px",
                    lineHeight: "16px",
                    marginLeft: "10px",
                    fontWeight: "600",
                    marginBottom: "0px",
                    "&:hover": { bgcolor: "#d9eaf0" },
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
