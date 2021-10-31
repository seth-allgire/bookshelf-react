import React from "react";

export const BookContext = React.createContext(null);

export function BookProvider(props) {
  return <BookContext.Provider>{props.children}</BookContext.Provider>;
}
