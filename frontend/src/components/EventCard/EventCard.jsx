import React from 'react';

function EventCard({ event, time, user, favorites }) {
  const isFavorite = favorites.some((fav) => fav.id === event.id);

  return (
    <div className="event-card">
      <img className="event-image" src={event.image} alt={event.title} />
      <div className="event-details">
        <h3>{event.title}</h3>
        <p>{time}</p>
        <p>{`Host: ${event.host}`}</p>
        <p>{`Price: $${event.ticketPrice}`}</p>
        {user && (
          <button className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
        )}
      </div>
    </div>
  );
}

export default EventCard;
