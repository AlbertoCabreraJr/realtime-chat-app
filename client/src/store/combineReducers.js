import { combineReducers } from "redux";
import { authReducer } from "./users";

const reducers = combineReducers({
  user: authReducer,
});

export default reducers;
