//SearchForm.js
import React, { useState } from "react";
import PropTypes from "prop-types";

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?q=${searchTerm}`
      );
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
