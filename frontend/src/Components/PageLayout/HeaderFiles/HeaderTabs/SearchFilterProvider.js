import React, { createContext, useContext, useState, useCallback } from "react";

const SearchFilterContext = createContext();
export const SearchFilterProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = useCallback(() => {
    setFilterOpen((prev) => !prev);
  }, []);

  return (
    <SearchFilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filterOpen,
        setFilterOpen,
        toggleFilter,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};
export const useSearchFilter = () => useContext(SearchFilterContext);
