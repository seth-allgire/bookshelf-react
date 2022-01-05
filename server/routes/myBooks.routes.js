const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

const {
  addMyBook,
  deleteMyBook,
  addBookNote,
  byUserID,
} = require("../models/myBooks.models");

router.post("/add", auth, (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    published: req.body.published,
    cover_id: req.body.cover_id,
    book_id: req.body.book_id,
    user_id: req.user.id,
  };
  if (
    !book.title ||
    !book.author ||
    !book.published ||
    !book.cover_id ||
    !book.book_id
  ) {
    return res.send({
      success: false,
      error: "Invalid data provided",
      data: null,
    });
  }
  addMyBook(res, book);
});

//TODO need to get this working!!!
router.post("/note", auth, (req, res) => {
  const { bookNote, cover_id } = req.body;
  if (!bookNote || !cover_id) {
    return req.send({
      success: false,
      error: "Invalid data provided",
      data: null,
    });
  }
  addBookNote(res, bookNote, req.user.id, cover_id);
});

router.delete("/delete/:id", auth, (req, res) => {
  deleteMyBook(res, req.params.id, req.user.id);
});

router.get("/user", auth, (req, res) => {
  byUserID(res, req.user.id);
});

module.exports = router;
