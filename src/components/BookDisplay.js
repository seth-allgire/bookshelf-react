import React from "react";
import {
  Card,
  // CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";

function BookDisplay({ title, author, published, coverId, bookId }) {
  const coverURL = "https://covers.openlibrary.org/b/id/" + coverId + "-M.jpg";
  const infoURL = "https://openlibrary.org" + bookId + ".json";

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
          <Button variant="contained" size="small" href="/bookDetails">
            More Info
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default BookDisplay;
