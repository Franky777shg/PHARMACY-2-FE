import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// React Router Dom
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allReducer from './redux/reducers'
import ReduxThunk from 'redux-thunk'

const globalState = createStore(allReducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={globalState}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
