import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { App } from './App'
import './index.css'
import { Capacitor } from '@capacitor/core';

// Wait for the deviceready event before starting the app
document.addEventListener('deviceready', () => {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}, false);

// If we're not in Capacitor (i.e., we're in a web browser), start immediately
if (!Capacitor.isNativePlatform()) {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}