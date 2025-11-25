import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Preserve native fetch and restore periodically to avoid injected wrappers (e.g. FullStory) that may break vite HMR
const __nativeFetch = window.fetch.bind(window);
setInterval(() => {
  try {
    if (window.fetch !== __nativeFetch) {
      window.fetch = __nativeFetch;
    }
  } catch (e) {
    // ignore
  }
}, 1000);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
