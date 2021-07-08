import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./combineReducers";
import thunk from "redux-thunk";

// Pwede rani if di ko ganahan naay redux dev tools
// const store = createStore(reducers, compose(applyMiddleware(thunk)));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
