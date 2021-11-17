// import React, { useContext, useEffect, useState } from "react";
// import useAxios from "../hooks/useAxios";
// import { BookContext } from "../shared/BookContext";
// import BookDisplay from "./BookDisplay";
// import { CircularProgress, Button, Pagination } from "@mui/material";

// const getSummary(())

// const infoURL = "https://openlibrary.org" + bookId + ".json";

// export default function SearchPage() {
//   const { myBooks, addMyBook, deleteMyBook, search, setSearch } =
//     useContext(BookContext);
//   const [queryInput, setQueryInput] = useState("");
//   const [query, setQuery] = useState("");
//   // const [formError, setFormError] = useState(false);
//   const { json, error, loading } = useAxios(query, "get");
//   // const numFound = search.length;

//   useEffect(() => {
//     if (json) {
//       setSearch(() =>
//         json.docs.map((book, idx) => ({
//           key: idx,
//           book_id: book.key,
//           title: book.title,
//           author: book.author_name.toString(),
//           cover_id: book.cover_i,
//           published: book.first_publish_year,
//         }))
//       );
//     } else if (json === error) return;

//     console.log(json);
//   }, [json, setSearch, error]);
