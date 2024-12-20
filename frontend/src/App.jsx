import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navigation from './components/Navigation/Navigation';
import MainPage from './components/MainPage/MainPage';
import EventPage from './components/EventPage/EventPage';
import SearchPage from './components/SearchPage/SearchPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import CreateEventForm from './components/CreateEventForm/CreateEventForm';
import Footer from './components/Footer/Footer';

import './css/index.css';

import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const categories = [
    { id: 1, name: 'Music' },
    { id: 2, name: 'Game' },
    { id: 3, name: 'Show' },
    { id: 4, name: 'Class' },
  ]; // Mocked categories, replace with fetched data if available

  useEffect(() => {
    if (!isLoaded) {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }
  }, [dispatch, isLoaded]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <div className="app-grid-container">
              <Navigation isLoaded={isLoaded} />
              <MainPage />
              <Footer />
            </div>
          </Route>
          <Route exact path="/events/search">
            <div className="app-grid-container">
              <Navigation isLoaded={isLoaded} />
              <SearchPage />
              <Footer />
            </div>
          </Route>
          <Route path="/events/create">
            <div className="app-grid-container">
              <Navigation isLoaded={isLoaded} />
              <CreateEventForm categories={categories} />
              <Footer />
            </div>
          </Route>
          <Route path="/events/:eventId">
            <div className="app-grid-container">
              <Navigation isLoaded={isLoaded} />
              <EventPage />
              <Footer />
            </div>
          </Route>
          <Route path="/profile">
            <div className="app-grid-container">
              <Navigation isLoaded={isLoaded} />
              <ProfilePage />
              <Footer />
            </div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
