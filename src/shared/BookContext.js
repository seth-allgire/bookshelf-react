import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

export const BookContext = React.createContext(null);

export function BookProvider(props) {
  const [user, setUser] = useState({});
  const [search, setSearch] = useState([]);
  const [myBooks, setMyBooks] = useState([]);

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

  // useEffect(() => {
  //   async function getFriendsBooks() {
  //     const { data } = await axios.get; //TODO need to figure out this path
  //     if (!data.success) return;
  //     setMyBooks(data.data);
  //   }
  //   if (user.username) {
  //     getFriendsBooks();
  //   }
  // }, [user]);

  const addMyBook = useCallback(
    async (book) => {
      const { data } = await axios.post("/api/myBook/add", {
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
      const { data } = await axios.delete(`/api/myBook/delete/${id}`);
      setMyBooks((curr) => {
        return curr.filter((val) => val.book_id != data.data);
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
    } catch (e) {}
  }, [setUser, setSearch, setMyBooks]);

  return (
    <BookContext.Provider
      value={{
        user,
        search,
        myBooks,
        setUser,
        setSearch,
        addMyBook,
        deleteMyBook,
        clearState,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
}
