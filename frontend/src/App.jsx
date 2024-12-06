
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation'; // Add the Navigation component
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore user session when the app loads
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // Render the application layout, including Navigation when the user data is loaded
  return (
    <>
      {isLoaded && <Navigation isLoaded={isLoaded} />}
      <Outlet />
    </>
  );
}

// Define routes for the application
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <h1>Welcome!</h1> },
      { path: '/login', element: <LoginFormPage /> },
      { path: '/signup', element: <SignupFormPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
