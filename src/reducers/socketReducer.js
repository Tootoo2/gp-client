import { SOCKET_CONNECT, SOCKET_CLOSE } from "../actions/types";

const INITIAL_STATE = {
  socket: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOCKET_CONNECT:
      return { socket: action.payload };
    case SOCKET_CLOSE:
      return { socket: null };
    default:
      return state;
  }
};
