import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import tips from "./tips";

export default combineReducers({
  auth,
  message,
  tips
});
