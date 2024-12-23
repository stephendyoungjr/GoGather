import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { favoriteEvent, unfavoriteEvent } from '../../store/events';
import DisplayEvents from '../DisplayEvents/DisplayEvents';

function MainPageEvents({ categories, events, user, favorites }) {
  const location = useLocation();
  const dispatch = useDispatch();

  // Ensure "All" is always the first category
  const extendedCategories = ['All', ...categories];
  const [category, setCategory] = useState('All');

  // Reset category to "All" if triggered from location state
  useEffect(() => {
    if (location.state?.resetCategory) {
      setCategory('All');
    }
  }, [location.state]);

  // Filter events based on the selected category
  const eventsByCategory = events.filter(
    (event) => category === 'All' || event.Category.category === category
  );

  // Handle favorite toggle
  const handleFavoriteToggle = (eventId, isFavorite) => {
    if (isFavorite) {
      dispatch(unfavoriteEvent(eventId));
    } else {
      dispatch(favoriteEvent({ id: eventId }));
    }
  };

  return (
    <div className="events-container">
      <h2 className="events-title">
        Popular in&nbsp;<span className="selected-category">{category}</span>
      </h2>
      <div className="category-bar">
        {extendedCategories.map((cat) => (
          <div
            key={cat}
            className={`category ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>
      <DisplayEvents
        favorites={favorites}
        user={user}
        events={eventsByCategory}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
}

export default MainPageEvents;


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { favoriteEvent, unfavoriteEvent } from '../../store/events';
// import DisplayEvents from '../DisplayEvents/DisplayEvents';

// function MainPageEvents({ categories, events, user, favorites }) {
//   const location = useLocation(); // Get location and state
//   const dispatch = useDispatch();

//   const [category, setCategory] = useState(categories[0] || 'All');

//   useEffect(() => {
//     if (location.state?.resetCategory) {
//       setCategory('All'); // Reset category
//     }
//   }, [location.state]);

//   const eventsByCategory = events.filter(
//     (event) => category === 'All' || event.Category.category === category
//   );

//   const handleFavoriteToggle = (eventId, isFavorite) => {
//     if (isFavorite) {
//       dispatch(unfavoriteEvent(eventId));
//     } else {
//       dispatch(favoriteEvent({ id: eventId }));
//     }
//   };

//   return (
//     <div className="events-container">
//       <h2 className="events-title">
//         Popular in&nbsp; <span className="selected-category">{category}</span>
//       </h2>
//       <div className="category-bar">
//         {categories.map((cat) => (
//           <div
//             key={cat}
//             className="category"
//             onClick={() => setCategory(cat)}
//           >
//             {cat}
//           </div>
//         ))}
//       </div>
//       <DisplayEvents
//         favorites={favorites}
//         user={user}
//         events={eventsByCategory}
//         onFavoriteToggle={handleFavoriteToggle}
//       />
//     </div>
//   );
// }

// export default MainPageEvents;


