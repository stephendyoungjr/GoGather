import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchForm from '../SearchForm/SearchForm.jsx';
import * as sessionActions from '../../store/session';

import logo from './logo.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
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
        <NavLink exact to="/">
          <img alt="logo" className="logo" src={logo} />
        </NavLink>
        <SearchForm />
      </div>
      <div></div>
      <div className="nav-bar-links">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
