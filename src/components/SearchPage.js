import React, { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { BookContext } from "../shared/BookContext";

const bookURL = `http://openlibrary.org/search.json?title=
`;

export default function SearchPage() {
  const { myBooks, addMyBook, deleteMyBook, search, setSearch } =
    useContext(BookContext);
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  // const [formError, setFormError] = useState(false);
  const { json, error, loading } = useAxios(query, "get");

  useEffect(() => {
    if (json) {
      setSearch(() =>
        json.docs.map((book) => ({
          key: book.key,
          title: book.title,
          author: book.author_name,
          isbn: book.isbn,
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
      <button
        // variant="contained"
        // color="primary"
        onClick={() => {
          // if (queryInput.length < 3) {
          //   setFormError(true);
          //   return;
          // }
          setQuery(bookURL + queryInput);
        }}
      >
        Search
      </button>
    </div>
  );
}
