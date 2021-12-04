import React, { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { BookContext } from "../shared/BookContext";
import BookDisplay from "./BookDisplay";
import {
  CircularProgress,
  Button,
  Box,
  Avatar,
  TextField,
  Typography,
  Container,
  Alert,
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
  const { json, error, loading } = useAxios(query, "get");

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
          <Avatar>
            <SearchOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Search
          </Typography>
        </Box>
        <Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: "40px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box>
              <TextField
                sx={{ mb: "3px" }}
                required
                id="search"
                label="Book title keyword"
                name="search"
                autoComplete="search"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                helperText="Enter keyword of title"
              />
            </Box>
            <Box>
              <Button
                type="submit"
                variant="containedPrimary"
                sx={{ mt: "20px" }}
                onClick={() => {
                  setQuery(bookURL + queryInput);
                  setAuthorQuery("");
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {loading && (
              <>
                <CircularProgress sx={{ color: "#1A6A86" }} />
                <div>Loading</div>
              </>
            )}
            {search.length > 0 && !loading && (
              <TextField
                id="author"
                label="Author"
                name="author"
                value={authorQuery}
                onChange={(e) => setAuthorQuery(e.target.value)}
                helperText="Filter by author"
              />
            )}
            {search.length > 0 && !loading && error && (
              <Alert severity="error">{error}</Alert>
            )}
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100vw",
          mt: "15px",
          justifyContent: "center",
        }}
      >
        {search &&
          !loading &&
          search
            .filter((val) =>
              val.author.toLowerCase().includes(authorQuery.toLowerCase())
            )
            .map((val) => (
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
            ))}
      </Box>
    </>
  );
}
