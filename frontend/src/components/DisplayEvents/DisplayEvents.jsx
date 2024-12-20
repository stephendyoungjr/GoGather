import React from "react";
import { dateFormat } from "../Utils";
import EventCard from "../EventCard/EventCard";

function DisplayEvents({ events, user, favorites, onFavoriteToggle }) {
  return (
    <div className="event-card-container">
      {events &&
        events.map((event) => {
          const time = dateFormat(event.time);
          return (
            <EventCard
              key={event.id}
              favorites={favorites}
              user={user}
              event={event}
              time={time}
              onFavoriteToggle={onFavoriteToggle}
            />
          );
        })}
    </div>
  );
}

export default DisplayEvents;
