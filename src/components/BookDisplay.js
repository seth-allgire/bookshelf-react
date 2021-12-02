import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Popover,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import InfoIcon from "@mui/icons-material/Info";
import CreateIcon from "@mui/icons-material/Create";

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
}) {
  const coverURL = "https://covers.openlibrary.org/b/id/" + cover_id + "-L.jpg";
  const infoURL = "https://openlibrary.org" + book_id;

  const [anchorEl, setAnchorEl] = useState(null);
  const [bookNote, setBookNote] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setBookNote(event.target.value);
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
          <img
            className="cover-image"
            src={coverURL}
            alt="Book Cover"
            title="Book Cover"
            onClick={handleDialogOpen}
          ></img>
        )}
        {/* <Button variant="outlined" onClick={handleDialogOpen}>
        Open alert dialog
      </Button> */}
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Card
            sx={{
              width: "300px",
              position: "relative",
              bgcolor: "#b8e3f3b4",
              marginLeft: "5px",
              marginBottom: "5px",
            }}
          >
            <CardContent>
              <Typography fontWeight="600">{title}</Typography>
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="subtitle2">
                    {cover_id && (
                      <img
                        className="cover-detail-image"
                        src={coverURL}
                        alt="Book Cover"
                        title="Book Cover"
                      ></img>
                    )}
                    {!cover_id && "Cover Image Not Available"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ paddingTop: "0px", paddingBottom: "0px" }}
                >
                  <Typography variant="body2">By: {author}</Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography variant="body2">
                    First Published: {published}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </CardContent>
            <CardActions>
              <Tooltip title="summary" placement="top">
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "70px",
                    marginBottom: "15px",
                  }}
                  variant="contained"
                  size="large"
                  target="_blank"
                  href={infoURL}
                >
                  <InfoIcon color="info" />
                </IconButton>
              </Tooltip>

              {!isMyBook && (
                <Tooltip title="add to shelf" placement="top">
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: "40px",
                      marginBottom: "15px",
                    }}
                    size="large"
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
                    <AddCircleIcon color="success" />
                  </IconButton>
                </Tooltip>
              )}
              {isMyBook && (
                <Tooltip title="Remove from shelf" placement="top">
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: "40px",
                      marginBottom: "15px",
                    }}
                    size="large"
                    onClick={() => deleteMyBook(cover_id)}
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </Tooltip>
              )}
              {isMyBook && (
                <IconButton
                  size="large"
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  <CreateIcon sx={{ color: "#FFA500" }} />
                </IconButton>
              )}
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
                <TextField
                  id="standard-helperText"
                  label="Book Notes"
                  multiline
                  maxRows={6}
                  value={bookNote}
                  onChange={handleChange}
                  sx={{ marginTop: "7px", outline: "none" }}
                />
                <button onClick={() => addBookNote({ bookNote })}>Save</button>
              </Popover>
            </CardActions>
          </Card>

          {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
        </Dialog>
      </div>

      {/* {cover_id && title.length < 34 && (
        <Card
          sx={{
            width: "300px",
            position: "relative",
            bgcolor: "#b8e3f3b4",
            marginLeft: "5px",
            marginBottom: "5px",
          }}
        >
          <CardContent>
            <Typography fontWeight="600">{title}</Typography>
            <Accordion disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="subtitle2">
                  {cover_id && (
                    <img
                      className="cover-image"
                      src={coverURL}
                      alt="Book Cover"
                      title="Book Cover"
                    ></img>
                  )}
                  {!cover_id && "Cover Image Not Available"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ paddingTop: "0px", paddingBottom: "0px" }}
              >
                <Typography variant="body2">By: {author}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body2">
                  First Published: {published}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
          <CardActions>
            <Tooltip title="summary" placement="top">
              <IconButton
                sx={{
                  position: "absolute",
                  right: "70px",
                  marginBottom: "15px",
                }}
                variant="contained"
                size="large"
                target="_blank"
                href={infoURL}
              >
                <InfoIcon color="info" />
              </IconButton>
            </Tooltip>

            {!isMyBook && (
              <Tooltip title="add to shelf" placement="top">
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "40px",
                    marginBottom: "15px",
                  }}
                  size="large"
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
                  <AddCircleIcon color="success" />
                </IconButton>
              </Tooltip>
            )}
            {isMyBook && (
              <Tooltip title="Remove from shelf" placement="top">
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "40px",
                    marginBottom: "15px",
                  }}
                  size="large"
                  onClick={() => deleteMyBook(cover_id)}
                >
                  <RemoveCircleIcon color="error" />
                </IconButton>
              </Tooltip>
            )}
            {isMyBook && (
              <IconButton
                size="large"
                aria-describedby={id}
                onClick={handleClick}
              >
                <CreateIcon sx={{ color: "#FFA500" }} />
              </IconButton>
            )}
            <Popover
              id={id}
              open={open}
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
              <TextField
                id="standard-helperText"
                label="Book Notes"
                multiline
                maxRows={6}
                value={bookNote}
                onChange={handleChange}
                sx={{ marginTop: "7px", outline: "none" }}
              />
              <button onClick={() => addBookNote({ bookNote })}>Save</button>
            </Popover>
          </CardActions>
        </Card>
      )} */}
    </>

    // </Box>
    // </Grid>
    // </Grid>
  );
}

export default BookDisplay;
