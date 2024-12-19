import React, { useState } from 'react';
import DisplayEvents from '../DisplayEvents/DisplayEvents';

function MainPageEvents({ categories, events, user, favorites }) {
  const [category, setCategory] = useState(categories[0] || 'All');
  const eventsByCategory = events.filter(
    (event) => category === 'All' || event.Category.category === category
  );

  return (
    <div className="events-container">
      <h2 className="events-title">
        Popular in{' '}
        <span className="selected-category">
          {category}
        </span>
      </h2>
      <div className="category-bar">
        {categories.map((cat) => (
          <div key={cat} className="category" onClick={() => setCategory(cat)}>
            {cat}
          </div>
        ))}
      </div>
      <DisplayEvents
        favorites={favorites}
        user={user}
        events={eventsByCategory}
      />
    </div>
  );
}

export default MainPageEvents;
