import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './style.css';

// PUBLIC_INTERFACE
export function bootstrap() {
  /**
   * Entry point for the Tic Tac Toe web app.
   *
   * This mounts the React <App /> component into the #app element defined in index.html.
   * The app is completely client-side and does not require any backend services.
   * React Router is used to provide a multi-page flow (Start, Config, Game).
   */
  const rootElement = document.getElementById('app');

  if (!rootElement) {
    // Fail gracefully if the root element is missing.
    // This should not normally happen in the current Vite scaffold.
    // eslint-disable-next-line no-console
    console.error('Root element "#app" not found. Unable to mount React application.');
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}

bootstrap();
