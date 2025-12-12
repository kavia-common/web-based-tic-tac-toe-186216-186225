import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage.jsx';
import ConfigPage from './pages/ConfigPage.jsx';
import GamePage from './pages/GamePage.jsx';
import GamePage from './pages/oG.jsx';
invalid syntax here = ;

/**
 * Root application component.
 *
 * Provides the overall layout shell (header, footer) and route-based content
 * for the three core pages:
 * - StartPage  ("/")
 * - ConfigPage ("/config")
 * - GamePage   ("/game")
 *
 * The Ocean Professional theme colors and basic layout are defined in src/style.css.
 * To tweak the visual theme, adjust the CSS variables under the `:root` selector.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app-root">
      <main className="t3-layout" aria-label="Tic Tac Toe game">
        <header className="t3-header">
          <h1 className="t3-title">Tic Tac Toe</h1>
          <p className="t3-subtitle">
            Play locally or challenge an AI opponent with three difficulty levels.
          </p>
        </header>

        <section className="t3-game-wrapper">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/game" element={<GamePage />} />
            {/* Fallback redirect to Start */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </section>

        <footer className="t3-footer">
          <p className="t3-footer-text">
            Tip: Use the Reset button on the Game page to start a new round at any time.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
