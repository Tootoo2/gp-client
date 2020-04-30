import { combineReducers } from "redux";
import auth from "./auth";
import user from "./userReducer";
import messages from "./chatReducer";
import io from "./socketReducer";
import users from "./usersReducer";

export default combineReducers({
  auth,
  user,
  messages,
  io,
  users,
});
