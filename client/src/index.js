import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import {thunk} from "redux-thunk";
let initialStore = {
  userDetails: {},
};
let loginReducer = (latestStore = initialStore, dispatchObj) => {
  if (dispatchObj.type == "Login") {
    return { ...latestStore, userDetails: dispatchObj.data };
  }

  return latestStore;
};
let tasksReducer = (latestStore = initialStore, dispatchObj) => {
  if (dispatchObj.type == "addtask") {
    return { ...latestStore, userDetails: dispatchObj.data };
  }

  return latestStore;
};
let leavesReducer = (latestStore = initialStore, dispatchObj) => {
  if (dispatchObj.type == "applyLeave") {
    return { ...latestStore, userDetails: dispatchObj.data };
  }

  return latestStore;
};
let StatusReducer = (latestStore = initialStore, dispatchObj) => {
  if (dispatchObj.type == "updateStatus") {
    return { ...latestStore, userDetails: dispatchObj.data };
  }

  return latestStore;
};
let store = createStore(combineReducers({loginReducer,tasksReducer,leavesReducer,StatusReducer}),applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
