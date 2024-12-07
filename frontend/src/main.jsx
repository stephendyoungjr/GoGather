// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from "./store/store";
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider } from './context/Modal';
import { Modal } from './context/Modal';  // Make sure Modal is imported from the correct path

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>  {/* Wrap everything in ModalProvider */}
        <App />
        <Modal />  {/* Modal should be rendered here outside the app's main structure */}
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);
