import React, { useContext } from "react";
import { BookContext } from "../shared/BookContext";

function Header() {
  const { user } = useContext(BookContext);
  return (
    <>
      <div>Header</div>
      {user.username && (
        // <div>
        //   <div className="show-user">
        //     <Avatar src="./" alt={user.username} />
        //   </div>
        //   <div className="show-user">
        <div>{user.username} </div>
        // </div>
        // </div>
      )}
    </>
  );
}

export default Header;
