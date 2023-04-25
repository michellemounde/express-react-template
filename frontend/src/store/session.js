import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  }
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
};

export const login = user => async dispatch => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    // headers will be set by csrfFetch
    body: JSON.stringify({
      credential,
      password
    })
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(setUser(data.user));
    return response;
  }
}





const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case SET_USER:
      nextState.user = action.payload;;
      return nextState;
    case REMOVE_USER:
      nextState.user = null;
      return nextState;
    default:
      return state;
  }
}

export default sessionReducer;
