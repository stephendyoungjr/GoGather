import React from 'react';

const ProfileSettings = ({ username, email }) => {
  return (
    <>
      <div className="profile-image-container">
        <img
          alt="Profile"
          className="profile-image"
          src="/default-profile-icon.png"
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '30px',
        }}
      >
        <h3>Welcome back, {username}!</h3>
        <div>
          <h4>Username: {username}</h4>
          <h4>Email: {email}</h4>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
