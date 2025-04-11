import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Clear sessionStorage if the page is refreshed
const navEntries = performance.getEntriesByType("navigation");
if (navEntries.length > 0 && navEntries[0].type === "reload") {
  sessionStorage.clear();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
