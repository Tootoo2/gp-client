import { combineReducers } from "redux";
import auth from "./auth";
import user from "./userReducer";
import messages from "./chatReducer";
import io from "./socketReducer";
import users from "./usersReducer";
import onlineUsers from './onlineUsersReducer'

export default combineReducers({
  auth,
  user,
  messages,
  io,
  users,
  onlineUsers
});
