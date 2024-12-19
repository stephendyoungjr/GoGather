import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getEvents, getFavorites } from '../../store/events';
import MainPageEvents from '../MainPageEvents/MainPageEvents';
import MainPageBanner from '../MainPageBanner/MainPageBanner';

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getFavorites());
  }, [dispatch]);

  const events = useSelector((state) => state.events.eventsList);
  const sessionUser = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => state.events.favorites);

  const categories = [...new Set(events.map((e) => e.Category.category))];

  return (
    <div className="body">
      <MainPageBanner />
      <MainPageEvents
        favorites={favorites}
        user={sessionUser}
        categories={categories}
        events={events}
      />
    </div>
  );
}

export default MainPage;
