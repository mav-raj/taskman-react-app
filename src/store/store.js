import { createStore, compose, applyMiddleware } from "redux";
// middlewares
import thunk from "redux-thunk";
import logger from "redux-logger";
import appReducer from "../reducers/index";

const middleware = [thunk, logger];
const initialState = {};

export default createStore(
  appReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
