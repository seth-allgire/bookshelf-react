import React, { useState } from "react";
import {
  CardActions,
  Tooltip,
  TextField,
  Dialog,
  Button,
  Box,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("body");
  const [openNote, setOpenNote] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
    setScroll(scroll);
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

  const handleNoteDialogOpen = () => {
    setOpenNote(true);
    setScroll(scroll);
  };

  const handleNoteDialogClose = () => {
    setOpenNote(false);
  };

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
          scroll={scroll}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          > */}
          {/* <Card
            sx={{
              alignSelf: "center",
              textAlign: "center",
              width: "50vw",
              position: "relative",
            }}
          > */}
          <div
            style={{
              padding: "10px",
              // display: "flex",
              // flexFlow: "column wrap",
              // alignContent: "center",
            }}
          >
            {/* <CardContent sx={{ alignSelf: "center" }}> */}
            {/* <Typography fontWeight="400" fontSize="30px" marginBottom="10px">
                {title}
              </Typography> */}
            <div
              style={{
                alignSelf: "center",
                fontWeight: "400",
                fontSize: "30px",
                marginBottom: "10px",
              }}
            >
              {title}
            </div>

            {cover_id && (
              <div
                style={{
                  // padding: "10px",
                  display: "flex",
                  flexFlow: "column wrap",
                  // alignContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  className="cover-detail-image"
                  src={coverURL}
                  alt="Book Cover"
                  title="Book Cover"
                ></img>

                {!cover_id && "Cover Image Not Available"}
                {/* <Typography>By: {author}</Typography>
              <Typography>First Published: {published}</Typography> */}
                <div>By: {author}</div>
                <div>First Published: {published}</div>
              </div>
            )}
          </div>
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
                  onClick={handleNoteDialogOpen}
                >
                  Book Notes
                </Button>
              )}
            </Box>
          </CardActions>

          <Dialog open={openNote} fullWidth>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <TextField
                label="Book Note"
                multiline
                rows={8}
                value={newBookNote}
                onChange={handleChange}
                placeholder="add your note"
              />
              <CardActions sx={{ justifyContent: "space-around" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  {" "}
                  <Tooltip title="Save" placement="top">
                    <Button
                      startIcon={<SaveOutlinedIcon />}
                      variant="containedSecondary"
                      onClick={() => {
                        addBookNote(newBookNote, cover_id);
                        handleNoteDialogClose();
                      }}
                    >
                      Save
                    </Button>
                  </Tooltip>
                  <Button
                    variant="containedSecondary"
                    startIcon={<CancelOutlinedIcon />}
                    onClick={() => {
                      handleNoteDialogClose();
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardActions>
            </Box>
          </Dialog>
          {/* </CardContent> */}
          {/* </Card> */}

          {/* </div> */}
        </Dialog>
      </div>
    </>
  );
}

export default BookDisplay;
