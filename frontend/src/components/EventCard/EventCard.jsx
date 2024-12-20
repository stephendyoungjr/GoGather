import React from 'react';
import { useHistory } from 'react-router-dom';

function EventCard({ event, time, user, favorites, onFavoriteToggle }) {
  const history = useHistory();
  const isFavorite = favorites.some((fav) => fav.id === event.id);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating to the card
    onFavoriteToggle(event.id, isFavorite);
  };

  const handleCardClick = () => {
    history.push(`/events/${event.id}`); // Navigates to the event page
  };

  return (
    <div
      className="event-card"
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={handleCardClick} // Makes the card clickable
    >
      <img className="event-image" src={event.image} alt={event.title} />
      <div className="event-details">
        <h3>{event.title}</h3>
        <p>{time}</p>
        <p>{`Host: ${event.host}`}</p>
        {event.ticketPrice ? <p>{`Price: $${event.ticketPrice}`}</p> : null}
      </div>
      {user && (
        <button
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteToggle}
        >
          <span className="heart-icon">♥</span>
        </button>
      )}
    </div>
  );
}

export default EventCard;
