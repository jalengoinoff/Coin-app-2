import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import ChartdataProvider  from "./context/ChartdataProvider";
import { WatchlistProvider } from './context/WatchlistContext';

const root = document.getElementById("root");
const rootInstance = createRoot(root); 

rootInstance.render(
  <React.StrictMode>
    <WatchlistProvider>
      <ChartdataProvider>
        <App />
      </ChartdataProvider>
    </WatchlistProvider>
  </React.StrictMode>
);
