import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './redux/rootReducer';
import createSagaMiddleware from 'redux-saga';
import Sagas from './redux/rootSaga';


const saga = createSagaMiddleware();

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk, saga
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

saga.run(Sagas);

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
