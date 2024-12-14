import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Components
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import EventDetailsPage from "./components/EventDetails/EventDetailsPage";
import ItineraryPage from "./components/Itinerary/ItineraryPage";
import CreateEventPage from "./components/CreateEvent/CreateEventPage";

// Redux Actions
import * as sessionActions from './redux/slices/sessionSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/events/:eventId',
        element: <EventDetailsPage />,
      },
      {
        path: '/itinerary',
        element: <ItineraryPage />,
      },
      {
        path: '/events/create',
        element: <CreateEventPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
    