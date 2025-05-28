import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaMicrophone, FaKeyboard, FaCamera } from 'react-icons/fa';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="container mt-5 p-4" style={{ backgroundColor: '#222', color: 'white', borderRadius: '10px' }}>
  <h1 className="text-center mb-4">Search</h1>

      <form onSubmit={handleSearch}>
        <div
          className="d-flex align-items-center p-2 px-3 mb-3"
          style={{
            backgroundColor: '#444',
            borderRadius: '50px',
            color: '#fff'
          }}
        >
          <FaSearch className="me-2" />

          <input
            type="text"
            className="form-control text-light bg-transparent border-0"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ boxShadow: 'none' }}
          />

          <label className="mb-0 me-3">
            <input type="file" accept="image/*" onChange={() => {}} hidden />
            <FaKeyboard style={{ cursor: 'pointer' }} />
          </label>

          <FaMicrophone className="me-3" style={{ cursor: 'pointer' }} />

          <label className="mb-0">
            <input type="file" accept="image/*" onChange={() => {}} hidden />
            <FaCamera style={{ cursor: 'pointer' }} />
          </label>
        </div>
      </form>

      {loading && <p>Loading...</p>}

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
