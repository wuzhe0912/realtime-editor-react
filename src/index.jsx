import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
// styles
import './index.css';
import 'normalize.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // in react 18 use strict mode, development mode will render twice, so temp disable it
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <>
    <App />,
  </>,
);
