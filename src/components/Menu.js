import React, { useEffect, useState, useContext } from "react";
import { BookContext } from "../shared/BookContext";
import { NavLink } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";
import userEvent from "@testing-library/user-event";

function Menu() {
  const [showButton, setShowButton] = useState(false);
  const { user, clearState } = useContext(BookContext);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div>
        {!user.username && (
          <>
            <NavLink to="/login" className="link" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/signup" className="link" activeClassName="active">
              Signup
            </NavLink>
          </>
        )}
        {user.username && (
          <>
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
        )}
        <Button className="logout" variant="contained" onClick={clearState}>
          Logout
        </Button>
      </div>
      <div>
        {showButton && (
          <Button
            onClick={scrollToTop}
            sx={{ position: "fixed", bottom: "20px", right: "20px" }}
            variant="contained"
            endIcon={<ArrowUpwardIcon />}
          >
            Top
          </Button>
        )}
      </div>
    </>
  );
}

export default Menu;
