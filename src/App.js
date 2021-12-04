import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Menu from "./components/Menu";
import MyBooksPage from "./components/MyBooksPage";
import SearchPage from "./components/SearchPage";
import SignupPage from "./components/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <ProtectedRoute shielded={false} path="/login">
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute shielded={false} path="/signup">
          <SignupPage />
        </ProtectedRoute>
        <ProtectedRoute shielded={true} path="/search">
          <SearchPage />
        </ProtectedRoute>
        <ProtectedRoute shielded={true} path="/myBooks">
          <MyBooksPage />
        </ProtectedRoute>
        <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
