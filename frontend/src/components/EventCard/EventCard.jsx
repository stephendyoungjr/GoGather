import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event, time, user, favorites, onFavoriteToggle }) {
  const isFavorite = favorites.some((fav) => fav.id === event.id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault(); // Prevent navigation when toggling favorite
    onFavoriteToggle(event.id, isFavorite);
  };

  return (
    <Link to={`/events/${event.id}`} className="event-card-link">
      <div className="event-card">
        <img className="event-image" src={event.image} alt={event.title} />
        <div className="event-details">
          <h3>{event.title}</h3>
          <p>{time}</p>
          <p>{`Host: ${event.host}`}</p>
          {event.ticketPrice && <p>{`Price: $${event.ticketPrice}`}</p>}
          {user && (
            <button
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={handleFavoriteToggle}
            >
              <span className="heart-icon">❤️</span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default EventCard;


// import React from 'react';

// function EventCard({ event, time, user, favorites, onFavoriteToggle }) {
//   const isFavorite = favorites.some((fav) => fav.id === event.id);

//   // Debugging logs
//   console.log('Event:', event);
//   console.log('Favorites:', favorites);
//   console.log('Is Favorite:', isFavorite);

//   const handleFavoriteToggle = () => {
//     onFavoriteToggle(event.id, isFavorite);
//   };

//   return (
//     <div className="event-card">
//       <img className="event-image" src={event.image} alt={event.title} />
//       <div className="event-details">
//         <h3>{event.title}</h3>
//         <p>{time}</p>
//         <p>{`Host: ${event.host}`}</p>
//         {event.ticketPrice ? <p>{`Price: $${event.ticketPrice}`}</p> : null}
//         {user && (
//           <button
//             className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
//             onClick={handleFavoriteToggle}
//           >
//             <span className="heart-icon">❤️</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EventCard;
