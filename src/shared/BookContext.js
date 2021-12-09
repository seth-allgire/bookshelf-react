import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

export const BookContext = React.createContext(null);

export function BookProvider(props) {
  const [user, setUser] = useState({});
  const [search, setSearch] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [bookNote, setBookNote] = useState({});

  useEffect(() => {
    async function verify() {
      try {
        const { data: json } = await axios.get("/api/users/verify");
        if (json.success) {
          setUser(json.data);
        }
      } catch (e) {}
    }
    verify();
  }, []);

  useEffect(() => {
    async function getMyBooks() {
      const { data } = await axios.get(`/api/myBooks/user`);
      if (!data.success) return;
      setMyBooks(data.data);
    }
    if (user.username) {
      getMyBooks();
    }
  }, [user]);

  //TODO HOW DO I SET THIS UP?
  const addBookNote = useCallback(
    async (bookNote) => {
      const { data } = await axios.post(`/api/myBooks/add`, {
        ...bookNote,
      });
      setBookNote([data.data]);
      console.log(bookNote);
    },
    [bookNote]
  );
  //need to create a new table for book notes that is tied by foreign key to myBooks;
  //then need to adjust "getbyusername" so that it pulls notes along with books???

  const addMyBook = useCallback(
    async (book) => {
      const { data } = await axios.post(`/api/myBooks/add`, {
        ...book,
      });
      setMyBooks((curr) => {
        return [...curr, data.data];
      });
    },
    [setMyBooks]
  );

  const deleteMyBook = useCallback(
    async (id) => {
      const { data } = await axios.delete(`/api/myBooks/delete/${id}`);
      setMyBooks((curr) => {
        return curr.filter((val) => val.cover_id != data.data);
      });
    },
    [setMyBooks]
  );

  const clearState = useCallback(async () => {
    try {
      await axios.get("/api/users/logout");
      setUser({});
      setSearch([]);
      setMyBooks([]);
      setBookNote({});
    } catch (e) {}
  }, [setUser, setSearch, setMyBooks, setBookNote]);

  return (
    <BookContext.Provider
      value={{
        user,
        search,
        myBooks,
        bookNote,
        setUser,
        setSearch,
        addBookNote,
        addMyBook,
        deleteMyBook,
        clearState,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
}
