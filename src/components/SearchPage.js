import React, { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { BookContext } from "../shared/BookContext";
import BookDisplay from "./BookDisplay";
import {
  CircularProgress,
  Button,
  Box,
  Grid,
  Avatar,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const bookURL = `http://openlibrary.org/search.json?title=
`;
// const infoURL = "https://openlibrary.org" + bookId + ".json";

export default function SearchPage() {
  const { myBooks, addMyBook, deleteMyBook, addBookNote, search, setSearch } =
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1A6A86" }}>
            <SearchOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Search
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ mb: "3px" }}
                required
                // fullWidth
                id="search"
                label="Book Title/Keyword"
                name="search"
                autoComplete="search"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                helperText="Enter book title or keyword"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            sx={{
              mt: "15px",
              mb: 2,
              bgcolor: "#1A6A86",
              "&:hover": {
                background: "#1a6986bb",
              },
            }}
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
            <TextField
              // fullWidth
              id="author"
              label="Author"
              name="author"
              value={authorQuery}
              onChange={(e) => setAuthorQuery(e.target.value)}
              helperText="Filter by author"
            />
          )}
        </Box>
      </Container>
      <Box sx={{ display: "flex", flexWrap: "wrap", width: "100vw" }}>
        {search &&
          !loading &&
          search
            .filter((val) =>
              val.author.toLowerCase().includes(authorQuery.toLowerCase())
            )
            .map((val) => (
              // <Box sx={{ display: "flex", flexWrap: "wrap", width: "100vw" }}>
              //   <Grid container spacing={2}>
              //     <Grid item xs={4}>
              <BookDisplay
                isMyBook={myBooks.some(
                  (book) => book.cover_id === val.cover_id
                )}
                key={val.cover_id}
                book_id={val.book_id}
                title={val.title}
                author={val.author}
                cover_id={val.cover_id}
                published={val.published}
                addMyBook={addMyBook}
                deleteMyBook={deleteMyBook}
                addBookNote={addBookNote}
              ></BookDisplay>
              //     </Grid>
              //   </Grid>
              // </Box>
            ))}
      </Box>
    </>
    // <div>
    //   <input
    //     className="form-input"
    //     value={queryInput}
    //     onChange={(e) => setQueryInput(e.target.value)}
    //     id="search"
    //     name="search"
    //     placeholder="enter title here"
    //   ></input>
    //   <Button
    //     onClick={() => {
    //       setQuery(bookURL + queryInput);
    //       setAuthorQuery("");
    //     }}
    //   >
    //     Search
    //   </Button>
    //   {loading && (
    //     <>
    //       <CircularProgress sx={{}} />
    //       <div>Loading</div>
    //     </>
    //   )}

    //   {search.length > 0 && !loading && (
    //     <>
    //       <label htmlFor="author">Filter by Author:</label>
    //       <input
    //         className="form-input"
    //         value={authorQuery}
    //         onChange={(e) => setAuthorQuery(e.target.value)}
    //         id="author"
    //         name="author"
    //         placeholder="author name"
    //       ></input>
    //     </>
    //   )}
    //   {search &&
    //     !loading &&
    //     search
    //       .filter((val) =>
    //         val.author.toLowerCase().includes(authorQuery.toLowerCase())
    //       )
    //       .map((val) => (
    //         <BookDisplay
    //           isMyBook={myBooks.some((book) => book.cover_id === val.cover_id)}
    //           key={val.cover_id}
    //           book_id={val.book_id}
    //           title={val.title}
    //           author={val.author}
    //           cover_id={val.cover_id}
    //           published={val.published}
    //           addMyBook={addMyBook}
    //           deleteMyBook={deleteMyBook}
    //           addBookNote={addBookNote}
    //         ></BookDisplay>
    //       ))}
    //   {search.length > 0 && <Pagination count={10} />}
    // </div>
  );
}
