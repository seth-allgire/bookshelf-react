import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  // CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";

function BookDisplay({
  title,
  author,
  published,
  cover_id,
  book_id,
  isMyBook,
  addMyBook,
  deleteMyBook,
}) {
  const coverURL = "https://covers.openlibrary.org/b/id/" + cover_id + "-M.jpg";
  // const infoURL = "https://openlibrary.org" + bookId + ".json";

  return (
    <div className="book-container">
      {/* <img src={coverURL} alt=""></img> */}

      <Card sx={{ width: "300px" }}>
        <CardMedia
          component="img"
          height="140"
          image={coverURL}
          sx={{
            objectFit: "contain",
            objectPosition: "top",
            backgroundColor: "",
          }}
          alt=""
        />

        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>

          <Typography sx={{ mt: "5px" }} color="text.secondary">
            by: {author}
          </Typography>

          <Typography color="text.secondary">
            first published: {published}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            size="small"
            // target="_blank"
            // rel="noreferrer noopener"
          >
            More Info
          </Button>
        </CardActions>
      </Card>
      {!isMyBook && (
        <Button
          variant="contained"
          onClick={() =>
            addMyBook({
              title,
              author,
              published,
              cover_id,
              book_id,
            })
          }
        >
          Save to Bookshelf
        </Button>
      )}
      {isMyBook && (
        <Button variant="contained" onClick={() => deleteMyBook(cover_id)}>
          Remove from Bookshelf
        </Button>
      )}
    </div>
  );
}

export default BookDisplay;
