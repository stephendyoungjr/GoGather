import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getRegistered, getFavorites } from '../../store/events';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import ProfileEvents from '../ProfileEvents/ProfileEvents';

function ProfilePage() {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.events.favorites);
  const registered = useSelector((state) => state.events.registered);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getRegistered());
    dispatch(getFavorites());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="body">
      <div className="profile-grid-container">
        <div className="profile-settings-container">
          <ProfileSettings
            username={sessionUser.username}
            email={sessionUser.email}
          />
        </div>
        <div className="profile-events-container">
          <ProfileEvents registered={registered} favorites={favorites} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
