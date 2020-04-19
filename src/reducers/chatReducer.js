import { FETCH_CHAT } from "../actions/types";

const INITIAL_STATE = {
  messages: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT:
      return { messages: action.payload };
    default:
      return state;
  }
};
