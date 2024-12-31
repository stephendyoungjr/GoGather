import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unregisterEvent, unfavoriteEvent, deleteEvent } from '../../store/events';
import DisplayUserEvents from '../DisplayUserEvents/DisplayUserEvents';
import { useHistory } from 'react-router-dom';

function ProfileEvents() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { registered, favorites, created } = useSelector((state) => state.events);

  const unregister = (eventId) => dispatch(unregisterEvent(eventId));
  const unfavorite = (eventId) => dispatch(unfavoriteEvent(eventId));
  const removeCreatedEvent = (eventId) => dispatch(deleteEvent(eventId));

  const handleEditEvent = (eventId) => {
    history.push(`/events/${eventId}/edit`);
  };

  return (
    <>
      <h2 className="profile-section-title">Registered Events</h2>
      <div className="user-events-container">
        <DisplayUserEvents
          events={registered}
          remove={unregister}
          deleteText="Cancel Registration"
        />
      </div>

      <h2 className="profile-section-title">Favorite Events</h2>
      <div className="user-events-container">
        <DisplayUserEvents
          events={favorites}
          remove={unfavorite}
          deleteText="Remove"
        />
      </div>

      <h2 className="profile-section-title">Created Events</h2>
      <div className="user-events-container">
        {created.map((event) => (
          <div key={event.id} className="user-event-card">
            <div className="user-event-card-details">
              <p>{event.title}</p>
              <p>{new Date(event.time).toLocaleString()}</p>
            </div>
            <button
              className="edit-event-btn"
              onClick={() => handleEditEvent(event.id)}
            >
              Edit Event
            </button>
            <button
              className="delete-event-btn"
              onClick={() => removeCreatedEvent(event.id)}
            >
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileEvents;


// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { unregisterEvent, unfavoriteEvent, deleteEvent } from '../../store/events';
// import DisplayUserEvents from '../DisplayUserEvents/DisplayUserEvents';

// function ProfileEvents() {
//   const dispatch = useDispatch();
//   const { registered, favorites, created } = useSelector((state) => state.events);

//   const unregister = (eventId) => dispatch(unregisterEvent(eventId));
//   const unfavorite = (eventId) => dispatch(unfavoriteEvent(eventId));
//   const removeCreatedEvent = (eventId) => dispatch(deleteEvent(eventId));

//   return (
//     <>
//       <h2 className="profile-section-title">Registered Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents events={registered} remove={unregister} deleteText="Cancel Registration" />
//       </div>

//       <h2 className="profile-section-title">Favorite Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents events={favorites} remove={unfavorite} deleteText="Remove" />
//       </div>

//       <h2 className="profile-section-title">Created Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents events={created} remove={removeCreatedEvent} deleteText="Delete Event" />
//       </div>
//     </>
//   );
// }

// export default ProfileEvents;


