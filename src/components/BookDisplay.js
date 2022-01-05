import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Tooltip,
  Popover,
  TextField,
  Dialog,
  Button,
  Box,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

function BookDisplay({
  title,
  author,
  published,
  cover_id,
  book_id,
  isMyBook,
  addMyBook,
  deleteMyBook,
  addBookNote,
  bookNote,
}) {
  const coverURL = "https://covers.openlibrary.org/b/id/" + cover_id + "-L.jpg";
  const infoURL = "https://openlibrary.org" + book_id + ".json";

  const [anchorEl, setAnchorEl] = useState(null);
  const [newBookNote, setNewBookNote] = useState(bookNote);
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setNewBookNote(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const textOpen = Boolean(anchorEl);
  const id = textOpen ? "simple-popover" : undefined;

  return (
    <>
      <div className="cover-container">
        {cover_id && (
          <>
            <img
              className="cover-image"
              src={coverURL}
              alt="Book Cover"
              title={title}
              onClick={handleDialogOpen}
            ></img>
            <div className="book-spine"></div>
          </>
        )}
        <div className="shelf"></div>
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Card
            sx={{
              alignSelf: "center",
              textAlign: "center",
              width: "50vw",
              position: "relative",
            }}
          >
            <CardContent sx={{}}>
              <Typography fontWeight="400" fontSize="30px" marginBottom="10px">
                {title}
              </Typography>

              {cover_id && (
                <img
                  className="cover-detail-image"
                  src={coverURL}
                  alt="Book Cover"
                  title="Book Cover"
                ></img>
              )}
              {!cover_id && "Cover Image Not Available"}
              <Typography>By: {author}</Typography>
              <Typography>First Published: {published}</Typography>
              <Typography>Notes: {bookNote}</Typography>

              <CardActions sx={{ justifyContent: "space-around" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  {" "}
                  <Tooltip title="Opens external link" placement="top">
                    <Button
                      variant="containedSecondary"
                      startIcon={<InfoOutlinedIcon />}
                      target="_blank"
                      href={infoURL}
                    >
                      Open Library
                    </Button>
                  </Tooltip>
                  {!isMyBook && (
                    <Button
                      variant="containedSecondary"
                      startIcon={<AddCircleOutlineOutlinedIcon color="" />}
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
                      Save to Shelf
                    </Button>
                  )}
                  {isMyBook && (
                    <Button
                      variant="containedSecondary"
                      startIcon={<RemoveCircleOutlineOutlinedIcon color="" />}
                      onClick={() => deleteMyBook(cover_id)}
                    >
                      Remove from Shelf
                    </Button>
                  )}
                  {isMyBook && (
                    <Button
                      variant="containedSecondary"
                      sx={{ mr: "0px" }}
                      startIcon={<CreateOutlinedIcon />}
                      onClick={handleClick}
                    >
                      Add Notes
                    </Button>
                  )}
                </Box>
                <Popover
                  id={id}
                  open={textOpen}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Book Note"
                      multiline
                      rows={3}
                      value={newBookNote}
                      onChange={handleChange}
                      placeholder="add your note"
                    />

                    <Button
                      variant="containedSecondary"
                      sx={{ mr: "0px" }}
                      onClick={() => addBookNote(newBookNote, cover_id)}
                    >
                      Save
                    </Button>
                  </Box>
                </Popover>
              </CardActions>
            </CardContent>
          </Card>
        </Dialog>
      </div>
    </>
  );
}

export default BookDisplay;
