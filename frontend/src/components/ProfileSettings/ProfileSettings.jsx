import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileSettings = ({ username, email }) => {
  return (
    <>
      <div className="profile-image-container">
        {/* Replace the img tag with an icon from Material UI */}
        <AccountCircleIcon
          style={{
            fontSize: '150px', // Adjust size
            color: '#ccc', // Adjust color
          }}
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

