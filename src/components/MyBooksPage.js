import React, { useContext } from "react";
import { BookContext } from "../shared/BookContext";
import BookDisplay from "./BookDisplay";

function MyBooksPage() {
  const { myBooks, deleteMyBook } = useContext(BookContext);

  return (
    <>
      <div>My Bookshelf</div>
      {myBooks.map((val) => {
        return (
          <BookDisplay
            isMyBook={true}
            key={val.book_id}
            book_id={val.book_id}
            title={val.title}
            author={val.author}
            cover_id={val.cover_id}
            published={val.published}
            deleteMyBook={deleteMyBook}
          />
        );
      })}
    </>
  );
}

export default MyBooksPage;
