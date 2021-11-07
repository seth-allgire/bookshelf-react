const query = require("../config/mysql.conf");

async function addMyBook(res, book) {
  try {
    await query("INSERT INTO myBooks SET ?", book);
    return res.send({
      success: true,
      error: null,
      data: book,
    });
  } catch (e) {
    return res.send({
      success: false,
      error: "Something went wrong",
      data: null,
    });
  }
}

async function deleteMyBook(res, id, user_id) {
  try {
    await query(
      "DELETE FROM myBooks WHERE myBooks.cover_id = ? AND myBooks.user_id = ?",
      [id, user_id]
    );
    return res.send({
      success: true,
      error: null,
      data: id,
    });
  } catch (e) {
    return res.send({
      success: false,
      error: "Something went wrong",
      data: null,
    });
  }
}

async function byUserID(res, user_id) {
  try {
    const myBooks = await query(
      //   "SELECT title, author, published, book_id, cover_id, FROM myBooks WHERE myBooks.user_id = ? ",
      "SELECT * FROM myBooks WHERE myBooks.user_id = ? ",
      [user_id]
    );
    return res.send({
      success: true,
      error: null,
      data: myBooks,
    });
  } catch (e) {
    return res.send({
      success: false,
      error: "Something went wrong",
      data: null,
    });
  }
}

module.exports = { addMyBook, deleteMyBook, byUserID };
