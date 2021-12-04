const query = require("../config/mysql.conf");

async function addBookNote(res, bookNote) {
  try {
    await query("INSERT INTO bookNotes SET ?", bookNote);
    return res.send({
      success: true,
      error: null,
      data: bookNote,
    });
  } catch (e) {
    return res.send({
      success: false,
      error: "Something went wrong",
      data: null,
    });
  }
}

module.exports = { addBookNote };
