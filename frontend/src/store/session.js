
import { csrfFetch } from './csrf';

// Action types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// Action creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// Thunk action for logging in a user
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Thunk action for restoring user session
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Thunk action for logging out a user
export const logout = () => async (dispatch) => {
  await csrfFetch('/api/session', { method: 'DELETE' });
  dispatch(removeUser());
};

// Initial state
const initialState = { user: null };

// Reducer function
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
