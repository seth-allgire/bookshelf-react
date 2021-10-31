import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import FriendsPage from "./components/FriendsPage";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Menu from "./components/Menu";
import MyBooksPage from "./components/MyBooksPage";
import SearchPage from "./components/SearchPage";
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Menu />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/myBooks">
            <MyBooksPage />
          </Route>
          <Route path="/friends">
            <FriendsPage />
          </Route>
          <Route path="*">
            <Redirect to="/login"></Redirect>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
