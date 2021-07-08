import { combineReducers } from "redux";
import { authReducer } from "./users";
import { roomReducer } from "./rooms";

const reducers = combineReducers({
  user: authReducer,
  room: roomReducer,
});

export default reducers;
