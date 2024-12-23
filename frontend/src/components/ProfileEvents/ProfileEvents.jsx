import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unregisterEvent, unfavoriteEvent, deleteEvent } from '../../store/events';
import DisplayUserEvents from '../DisplayUserEvents/DisplayUserEvents';

function ProfileEvents() {
  const dispatch = useDispatch();
  const { registered, favorites, created } = useSelector((state) => state.events);

  const unregister = (eventId) => dispatch(unregisterEvent(eventId));
  const unfavorite = (eventId) => dispatch(unfavoriteEvent(eventId));
  const removeCreatedEvent = (eventId) => dispatch(deleteEvent(eventId));

  return (
    <>
      <h2 className="profile-section-title">Registered Events</h2>
      <div className="user-events-container">
        <DisplayUserEvents events={registered} remove={unregister} deleteText="Cancel Registration" />
      </div>

      <h2 className="profile-section-title">Favorite Events</h2>
      <div className="user-events-container">
        <DisplayUserEvents events={favorites} remove={unfavorite} deleteText="Remove" />
      </div>

      <h2 className="profile-section-title">Created Events</h2>
      <div className="user-events-container">
        <DisplayUserEvents events={created} remove={removeCreatedEvent} deleteText="Delete Event" />
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

//   const unregister = (eventId) => {
//     dispatch(unregisterEvent(eventId));
//   };

//   const unfavorite = (eventId) => {
//     dispatch(unfavoriteEvent(eventId));
//   };

//   const removeCreatedEvent = (eventId) => {
//     dispatch(deleteEvent(eventId));
//   };

//   return (
//     <>
//       <h2 className="profile-section-title">Registered Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents
//           events={registered}
//           remove={unregister}
//           deleteText="Cancel Registration"
//         />
//       </div>

//       <h2 className="profile-section-title">Favorite Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents
//           events={favorites}
//           remove={unfavorite}
//           deleteText="Remove"
//         />
//       </div>

//       <h2 className="profile-section-title">Created Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents
//           events={created}
//           remove={removeCreatedEvent}
//           deleteText="Delete Event"
//         />
//       </div>
//     </>
//   );
// }

// export default ProfileEvents;

// ------------------------------------------
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { unregisterEvent, unfavoriteEvent, deleteEvent } from '../../store/events';
// import DisplayUserEvents from '../DisplayUserEvents/DisplayUserEvents';

// function ProfileEvents() {
//   const dispatch = useDispatch();
//   const { registered, favorites, created } = useSelector((state) => state.events);

//   const unregister = (eventId) => dispatch(unregisterEvent(eventId));
//   const unfavorite = (eventId) => dispatch(unfavoriteEvent(eventId));
//   const removeCreatedEvent = async (eventId) => {
//     await dispatch(deleteEvent(eventId)); // Wait for the deletion to complete
//   };

//   return (
//     <>
//       <h2 className="profile-section-title">Registered Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents
//           events={registered}
//           remove={unregister}
//           deleteText="Cancel Registration"
//         />
//       </div>

//       <h2 className="profile-section-title">Favorite Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents
//           events={favorites}
//           remove={unfavorite}
//           deleteText="Remove"
//         />
//       </div>

//       <h2 className="profile-section-title">Created Events</h2>
//       <div className="user-events-container">
//         <DisplayUserEvents
//           events={created}
//           remove={removeCreatedEvent}
//           deleteText="Delete Event"
//         />
//       </div>
//     </>
//   );
// }

// export default ProfileEvents;
