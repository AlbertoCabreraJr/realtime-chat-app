import { combineReducers } from "redux";
import { authReducer } from "./users";

const reducers = combineReducers({
  auth: authReducer,
});

export default reducers;
