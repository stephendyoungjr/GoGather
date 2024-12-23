import { csrfFetch } from '../store/csrf';

/* ACTION VERBS */
const LOAD_EVENTS = 'events/LOAD_EVENTS';
const LOAD_REGISTERED = 'events/LOAD_REGISTERED';
const LOAD_FAVORITES = 'events/LOAD_FAVORITES';
const LOAD_CREATED = 'events/LOAD_CREATED';
const LOAD_SEARCH_RESULTS = 'events/LOAD_SEARCH_RESULTS';
const REGISTER = 'events/REGISTER';
const FAVORITE = 'events/FAVORITE';
const UNREGISTER = 'events/UNREGISTER';
const UNFAVORITE = 'events/UNFAVORITE';
const CREATE_EVENT = 'events/CREATE_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';

/* ACTION CREATORS */
const createEvent = (event) => ({
  type: CREATE_EVENT,
  event,
});

const deleteEventAction = (eventId) => ({
  type: DELETE_EVENT,
  eventId,
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

const loadCreated = (created) => ({
  type: LOAD_CREATED,
  created,
});

const loadSearchResults = (results) => ({
  type: LOAD_SEARCH_RESULTS,
  results,
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

export const getCreatedEvents = () => async (dispatch) => {
  const response = await fetch(`/api/events/created`);

  if (response.ok) {
    const created = await response.json();
    dispatch(loadCreated(created));
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

export const deleteEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const { eventId: deletedId } = await response.json();
    dispatch(deleteEventAction(deletedId));
  }
};

/* EVENT REDUCER */
const initialState = {
  eventsList: [],
  registered: [],
  favorites: [],
  created: [],
  searchResults: [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      return {
        ...state,
        eventsList: action.events,
      };

    case LOAD_REGISTERED:
      return {
        ...state,
        registered: action.registered,
      };

    case LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
      };

    case LOAD_CREATED:
      return {
        ...state,
        created: action.created,
      };

    case LOAD_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.results,
      };

    case REGISTER:
      return {
        ...state,
        registered: [...state.registered, action.event],
      };

    case FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.event],
      };

    case UNREGISTER:
      return {
        ...state,
        registered: state.registered.filter((event) => event.id !== parseInt(action.eventId, 10)),
      };

    case UNFAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((event) => event.id !== parseInt(action.eventId, 10)),
      };

    case CREATE_EVENT:
      return {
        ...state,
        created: [...state.created, action.event],
      };

    case DELETE_EVENT:
      return {
        ...state,
        created: state.created.filter((event) => event.id !== parseInt(action.eventId, 10)),
      };

    default:
      return state;
  }
};

export default eventsReducer;
