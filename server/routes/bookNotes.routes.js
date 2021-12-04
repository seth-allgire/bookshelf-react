const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

const { addBookNote } = require("../models/bookNotes.models");

router.post("/add", auth, (req, res) => {
  const bookNote = {
    bookNote: req.body.bookNote,
  };
  if (!bookNote.bookNote) {
    return res.send({
      success: false,
      error: "Invalid data provided",
      data: null,
    });
  }
  addBookNote(res, bookNote);
});

module.exports = router;
