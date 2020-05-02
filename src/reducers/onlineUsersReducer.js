import { FETCH_ONLINE_USERS } from '../actions/types';

const INITIAL_STATE = {
  users: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ONLINE_USERS:
      return { users: action.payload };
    default:
      return state;
  }
};
