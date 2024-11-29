import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Workbox } from 'workbox-window';


const root = ReactDOM.createRoot(document.getElementById('root'));

// Configura la URL del service worker correctamente
const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

if ('serviceWorker' in navigator && swUrl) {
  const wb = new Workbox(swUrl);
  wb.register();
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, puedes pasar una función a reportWebVitals
reportWebVitals();
