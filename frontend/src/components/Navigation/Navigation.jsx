/* Navigation.jsx */
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchForm from '../SearchForm/SearchForm.jsx';
import * as sessionActions from '../../store/session';

import logo from './logo.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const handleLogoClick = () => {
    history.push('/', { resetCategory: true }); // Navigate to home and reset category
  };

  const handleCreateEventClick = () => {
    history.push('/events/create'); // Navigate to Create Event page
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <button
          className="create-event-btn"
          onClick={handleCreateEventClick}
          style={{ marginRight: '10px' }}
        >
          Create Event
        </button>
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
        <NavLink onClick={logout} className="nav-link" to="/">
          Log Out
        </NavLink>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className="nav">
      <div className="nav-bar-fixed">
        <img
          alt="logo"
          className="logo"
          src={logo}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
        <SearchForm />
      </div>
      <div></div>
      <div className="nav-bar-links">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;

