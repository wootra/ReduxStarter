import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import ReduxPromise from "redux-promise";
import reducers from "./reducers";

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <Provider store={applyMiddleware(ReduxPromise)(createStore)(reducers)}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
