import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";

function Menu() {
  const [showButton, setShowButton] = useState(false);

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
