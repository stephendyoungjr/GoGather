import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { favoriteEvent, unfavoriteEvent } from '../../store/events';
import DisplayEvents from '../DisplayEvents/DisplayEvents';

function MainPageEvents({ categories, events, user, favorites }) {
  const [category, setCategory] = useState(categories[0] || 'All');
  const dispatch = useDispatch();

  const eventsByCategory = events.filter(
    (event) => category === 'All' || event.Category.category === category
  );

  const handleFavoriteToggle = (eventId, isFavorite) => {
    if (isFavorite) {
      dispatch(unfavoriteEvent(eventId));
    } else {
      dispatch(favoriteEvent({ id: eventId }));
    }
  };

  return (
    <div className="events-container">
<h2 className="events-title">
  Popular in&nbsp;<span className="selected-category">{category}</span>
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
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
}

export default MainPageEvents;
