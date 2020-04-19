import { AUTH_USER, AUTH_FAIL, USER_SIGNOUT } from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { authenticated: action.payload, errorMessage: "" };
    case AUTH_FAIL:
      return { authenticated: "", errorMessage: action.payload };
    case USER_SIGNOUT:
      return { authenticated: "", errorMessage: "" };
    default:
      return state;
  }
};
