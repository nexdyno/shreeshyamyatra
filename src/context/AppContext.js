"use client";

// context/AppContext.js
import { createContext, useState, useContext } from "react";

// Create a context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a provider component
export const AppProvider = ({ children }) => {
  const [routePathName, setRoutePathName] = useState("/");
  const [mobileSearch, setmobileSearch] = useState(false);
  const [clickCheck, setclickCheck] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoginModalOpen, setLoginIsModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        routePathName,
        setRoutePathName,
        mobileSearch,
        setmobileSearch,
        clickCheck,
        setclickCheck,
        searchText,
        setSearchText,
        isLoginModalOpen,
        setLoginIsModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
