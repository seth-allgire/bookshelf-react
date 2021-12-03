import React from "react";
import ReactDOM from "react-dom";
import "./bookshelf.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BookProvider } from "./shared/BookContext";
import { ThemeProvider } from "@emotion/react";
import BookTheme from "./BookTheme";

ReactDOM.render(
  <ThemeProvider theme={BookTheme}>
    <BookProvider>
      <App />
    </BookProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
