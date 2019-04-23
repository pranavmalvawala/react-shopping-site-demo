import logger from "redux-logger";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import selectReducer from "./reducers/selectReducer";
import cartReducer from "./reducers/cartReducer";

export default createStore(
  combineReducers({ selectReducer, cartReducer }),
  {},
  applyMiddleware(logger, thunk)
);
