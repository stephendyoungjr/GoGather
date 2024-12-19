import React from 'react';
import { useDispatch } from 'react-redux';

import { unregisterEvent, unfavoriteEvent } from '../../store/events';
import DisplayUserEvents from '../DisplayUserEvents/DisplayUserEvents';

function ProfileEvents({ registered, favorites }) {
  const dispatch = useDispatch();

  const unregister = (eventId) => dispatch(unregisterEvent(eventId));
  const unfavorite = (eventId) => dispatch(unfavoriteEvent(eventId));

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
    </>
  );
}

export default ProfileEvents;
