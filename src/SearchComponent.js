import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: 'GET',
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI',
        params: { q: query, pageNumber: '1', pageSize: '10', autoCorrect: 'true' },
        headers: {
          'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
          'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY'
        }
      };

      const response = await axios.request(options);
      setResults(response.data.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Search Engine App</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search something..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      <div className="list-group">
        {results.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="list-group-item list-group-item-action"
          >
            <h5 className="mb-1">{item.title}</h5>
            <p className="mb-1">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
