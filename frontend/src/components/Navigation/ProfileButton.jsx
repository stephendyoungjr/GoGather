const ProfileButton = ({ user, logout }) => {
  return (
    <div className="profile-button">
      <span>{user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
