import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ChartdataProvider from "./context/ChartdataProvider";
import { WatchlistProvider } from './context/WatchlistContext';

ReactDOM.render(
  <React.StrictMode>
    <WatchlistProvider>
      <ChartdataProvider>
        <App />
      </ChartdataProvider>
    </WatchlistProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

