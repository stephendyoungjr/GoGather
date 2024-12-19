import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchEvents } from '../../store/events';

function SearchForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchEvents(query));
    history.push('/events/search');
  };

  return (
    <div>
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <i className="fas fa-search search-image"></i> {/* Font Awesome Search Icon */}
        <input
          className="search-bar-input"
          type="text"
          value={query}
          placeholder="Search events"
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </form>
    </div>
  );
}

export default SearchForm;
