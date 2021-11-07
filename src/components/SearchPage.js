import React, { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { BookContext } from "../shared/BookContext";
import BookDisplay from "./BookDisplay";
import { CircularProgress, Button, Pagination } from "@mui/material";

const bookURL = `http://openlibrary.org/search.json?title=
`;
// const infoURL = "https://openlibrary.org" + bookId + ".json";

export default function SearchPage() {
  const { myBooks, addMyBook, deleteMyBook, search, setSearch } =
    useContext(BookContext);
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  // const [formError, setFormError] = useState(false);
  const { json, error, loading } = useAxios(query, "get");
  // const numFound = search.length;

  useEffect(() => {
    if (json) {
      setSearch(() =>
        json.docs.map((book, idx) => ({
          key: idx,
          book_id: book.key,
          title: book.title,
          author: book.author_name.toString(),
          cover_id: book.cover_i,
          published: book.first_publish_year,
        }))
      );
    } else if (json === error) return;

    console.log(json);
  }, [json, setSearch, error]);

  return (
    <div>
      <input
        className="form-input"
        value={queryInput}
        onChange={(e) => setQueryInput(e.target.value)}
        id="search"
        name="search"
        placeholder="enter title here"
      ></input>
      <Button
        onClick={() => {
          setQuery(bookURL + queryInput);
          setAuthorQuery("");
        }}
      >
        Search
      </Button>
      {loading && (
        <>
          <CircularProgress sx={{}} />
          <div>Loading</div>
        </>
      )}

      {search.length > 0 && !loading && (
        <>
          <label htmlFor="author">Filter by Author:</label>
          <input
            className="form-input"
            value={authorQuery}
            onChange={(e) => setAuthorQuery(e.target.value)}
            id="author"
            name="author"
            placeholder="author name"
          ></input>
        </>
      )}

      {search &&
        !loading &&
        search
          .filter((val) =>
            val.author.toLowerCase().includes(authorQuery.toLowerCase())
          )
          .map((val) => (
            // search.map((val) => (

            <BookDisplay
              isMyBook={myBooks.some((book) => book.cover_id === val.cover_id)}
              key={val.cover_id}
              book_id={val.book_id}
              title={val.title}
              author={val.author}
              cover_id={val.cover_id}
              published={val.published}
              addMyBook={addMyBook}
              deleteMyBook={deleteMyBook}
            ></BookDisplay>
          ))}
      {search.length > 0 && <Pagination count={10} />}
    </div>
  );
}
