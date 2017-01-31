import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from "redux-thunk";
// import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './src/App'
import Reducers from './src/Reducers'
// import About from './app/js/component/About'
// import Posts from './app/js/component/Posts'
// import Home from './app/js/component/Home'
// import Editor from './app/js/component/Editor'

// render((
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Home} />
//       <Route path="/posts" component={Posts}/>
//       <Route path="/about" component={About}/>
//     </Route>
//   </Router>
// ), document.getElementById('app'))
const craeteStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
const store = craeteStoreWithMiddleware(Reducers);
render(
  <Provider store={ store }>
    <App />
  </Provider>, 
  document.getElementById('root')
);