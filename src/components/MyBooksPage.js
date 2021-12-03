import React, { useContext } from "react";
import { BookContext } from "../shared/BookContext";
import BookDisplay from "./BookDisplay";
import { Box, Typography, Avatar } from "@mui/material";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";

function MyBooksPage() {
  const { user, myBooks, deleteMyBook, addBookNote } = useContext(BookContext);

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          mb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar>
          <LocalLibraryOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {user.username}'s Bookshelf
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", width: "100vw" }}>
        {myBooks.map((val) => {
          return (
            <BookDisplay
              isMyBook={true}
              key={val.cover_id}
              book_id={val.book_id}
              title={val.title}
              author={val.author}
              cover_id={val.cover_id}
              published={val.published}
              deleteMyBook={deleteMyBook}
              addBookNote={addBookNote}
            />
          );
        })}
      </Box>
    </>
  );
}

export default MyBooksPage;
