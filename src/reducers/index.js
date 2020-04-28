import { combineReducers } from "redux";
import auth from "./auth";
import user from "./userReducer";
import messages from "./chatReducer";
import io from "./socketReducer";

export default combineReducers({
  auth,
  user,
  messages,
  io,
});
