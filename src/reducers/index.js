import { combineReducers } from "redux";
import auth from "./auth";
import user from "./userReducer";
import messages from "./chatReducer";

export default combineReducers({
  auth,
  user,
  messages,
});
