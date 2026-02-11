import {combineReducers} from '@reduxjs/toolkit'
import user from "./user";
import requests from "./requests";
import errorHandlerReducer from "./errorHandlerReducer";
import requestsHandler from "./requestsHandler";
import application from "./application";

const rootReducer = combineReducers({
  [requests.name]: requests.reducer,
  [user.name]: user.reducer,
  [errorHandlerReducer.name]: errorHandlerReducer.reducer,
  [requestsHandler.name]: requestsHandler.reducer,
  [application.name]: application.reducer,
});


export default rootReducer;
