import React, { useState } from 'react';

function AutocompleteSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchData = async (inputQuery) => {
    try {
      const response = await fetch(`/gettablename?q=${encodeURIComponent(inputQuery)}`);
      const data = await response.json();
      setSuggestions(data); // Assuming data is an array of objects with 'name' property
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    
    if (inputValue.trim() === '') {
      setSuggestions([]);
    } else {
      fetchData(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded"
      />
      {suggestions.length > 0 && (
        <div className="suggestions bg-white border mt-1">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="suggestion p-2 cursor-pointer transition duration-300 hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutocompleteSearch;
