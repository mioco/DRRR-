import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from "redux-thunk";
// import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './src/App'
import Reducers from './src/Reducers'
const craeteStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
const store = craeteStoreWithMiddleware(Reducers);
render(
  <Provider store={ store }>
    <App />
  </Provider>, 
  document.getElementById('root')
);