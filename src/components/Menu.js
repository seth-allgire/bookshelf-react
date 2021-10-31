import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <>
      <NavLink to="/login" className="link" activeClassName="active">
        Login
      </NavLink>
      <NavLink to="/signup" className="link" activeClassName="active">
        Signup
      </NavLink>
      <NavLink to="/search" className="link" activeClassName="active">
        Search
      </NavLink>
      <NavLink to="/myBooks" className="link" activeClassName="active">
        My Bookshelf
      </NavLink>
      <NavLink to="/friends" className="link" activeClassName="active">
        Friends
      </NavLink>
    </>
  );
}

export default Menu;
