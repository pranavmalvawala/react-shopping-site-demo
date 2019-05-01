import logger from "redux-logger";
import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import selectReducer from "./reducers/selectReducer";
import cartReducer from "./reducers/cartReducer";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const reducers = combineReducers({ selectReducer, cartReducer });

const persistedState = loadFromLocalStorage();

const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(logger, thunk)
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
