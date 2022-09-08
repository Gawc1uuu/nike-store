import { createContext, useState } from "react";

export const SingleShoeContext = createContext();

export const SingleShoeContextProvider = ({ children }) => {
  const [singleShoe, setSingleShoe] = useState(null);

  const getShoe = (shoe) => {
    setSingleShoe({ ...shoe });
  };

  return (
    <SingleShoeContext.Provider value={{ singleShoe, getShoe }}>
      {children}
    </SingleShoeContext.Provider>
  );
};
