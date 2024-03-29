import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import { store } from './app/store'; 
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom"
import { GlobalStyle } from './themes/GlobalStyle';

const root = createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
      <App />
      <GlobalStyle/>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
