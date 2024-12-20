/* events.js */
import { csrfFetch } from '../store/csrf';

/* ACTION VERBS */
const LOAD_EVENTS = 'events/LOAD_EVENTS';
const LOAD_REGISTERED = 'events/LOAD_REGISTERED';
const LOAD_FAVORITES = 'events/LOAD_FAVORITES';
const LOAD_SEARCH_RESULTS = 'events/LOAD_SEARCH_RESULTS';
const REGISTER = 'events/REGISTER';
const FAVORITE = 'events/FAVORITE';
const UNREGISTER = 'events/UNREGISTER';
const UNFAVORITE = 'events/UNFAVORITE';
const CREATE_EVENT = 'events/CREATE_EVENT';

/* ACTION CREATORS */
const createEvent = (event) => ({
  type: CREATE_EVENT,
  event,
});

const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  events,
});

const loadRegistered = (registered) => ({
  type: LOAD_REGISTERED,
  registered,
});

const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  favorites,
});

const register = (event) => ({
  type: REGISTER,
  event,
});

const favorite = (event) => ({
  type: FAVORITE,
  event,
});

const unregister = (eventId) => ({
  type: UNREGISTER,
  eventId,
});

const unfavorite = (eventId) => ({
  type: UNFAVORITE,
  eventId,
});

const loadSearchResults = (results) => ({
  type: LOAD_SEARCH_RESULTS,
  results,
});

/* GET THUNKS */
export const getEvents = () => async (dispatch) => {
  const response = await fetch(`/api/events/`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEvents(data.events));
  }
};

export const getRegistered = () => async (dispatch) => {
  const response = await fetch(`/api/events/registrations`);

  if (response.ok) {
    const registered = await response.json();
    dispatch(loadRegistered(registered));
  }
};

export const getFavorites = () => async (dispatch) => {
  const response = await fetch(`/api/events/favorites`);

  if (response.ok) {
    const favorites = await response.json();
    dispatch(loadFavorites(favorites));
  }
};

/* POST THUNKS */
export const registerEvent = (payload) => async (dispatch) => {
  const eventId = payload.id;
  const ticketCount = parseInt(payload.ticketCount, 10);

  const response = await csrfFetch(`/api/events/${eventId}/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticketCount }),
  });

  if (response.ok) {
    const event = await response.json();
    dispatch(register(event));
  }
};

export const favoriteEvent = (payload) => async (dispatch) => {
  const eventId = payload.id;

  const response = await csrfFetch(`/api/events/${eventId}/favorite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId }),
  });

  if (response.ok) {
    const event = await response.json();
    dispatch(favorite(event));
  }
};

export const searchEvents = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (response.ok) {
    const results = await response.json();
    dispatch(loadSearchResults(results));
  }
};

export const createNewEvent = (payload) => async (dispatch) => {
  const response = await csrfFetch('/api/events/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newEvent = await response.json();
    dispatch(createEvent(newEvent));
    return newEvent;
  }
};

/* DELETE THUNKS */
export const unregisterEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/registration`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const unregisteredId = await response.json();
    dispatch(unregister(unregisteredId));
  }
};

export const unfavoriteEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/favorites`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const unfavoriteId = await response.json();
    dispatch(unfavorite(unfavoriteId));
  }
};

/* EVENT REDUCER */
const initialState = {
  eventsList: [],
  registered: [],
  favorites: [],
  searchResults: [],
};

const eventsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD_EVENTS: {
      const allEvents = {};
      action.events.forEach((event) => {
        allEvents[event.id] = event;
      });
      return {
        ...allEvents,
        ...state,
        eventsList: action.events,
      };
    }
    case LOAD_REGISTERED: {
      return {
        ...state,
        registered: action.registered,
      };
    }
    case LOAD_FAVORITES: {
      return {
        ...state,
        favorites: action.favorites,
      };
    }
    case LOAD_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: action.results,
      };
    }
    case REGISTER: {
      newState = { ...state };
      const newRegistered = [...newState.registered, action.event];
      newState.registered = newRegistered;
      return newState;
    }
    case FAVORITE: {
      newState = { ...state };
      const newFavorites = [...newState.favorites, action.event];
      newState.favorites = newFavorites;
      return newState;
    }
    case UNREGISTER: {
      newState = { ...state };
      const newRegistered = newState.registered.filter(
        (event) => event.id.toString() !== action.eventId.toString()
      );
      newState.registered = newRegistered;
      return newState;
    }
    case UNFAVORITE: {
      newState = { ...state };
      const newFavorites = newState.favorites.filter(
        (event) => event.id.toString() !== action.eventId.toString()
      );
      newState.favorites = newFavorites;
      return newState;
    }
    case CREATE_EVENT: {
      newState = { ...state };
      newState.eventsList = [...newState.eventsList, action.event];
      return newState;
    }
    default:
      return state;
  }
};

export default eventsReducer;
