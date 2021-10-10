import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import rootReducer from './stores/reducer/rootReducer.js'
import reportWebVitals from './reportWebVitals';
// import reducer2 from './stores/reducer/reducer2';
import reducer from './stores/reducer/index';
import "./styles/global.css";

const reduxStore  =createStore(reducer);

ReactDOM.render(
  <Provider store={reduxStore}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
