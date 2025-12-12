import React from 'react';
import Game from './components/Game.jsx';

/**
 * Root application component.
 *
 * Renders the overall layout shell and the Tic Tac Toe <Game />.
 * The Ocean Professional theme colors and basic layout are defined in src/style.css.
 * To tweak the visual theme, adjust the CSS variables under the `:root` selector in src/style.css.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app-root">
      <main className="t3-layout" aria-label="Tic Tac Toe game">
        <header className="t3-header">
          <h1 className="t3-title">Tic Tac Toe</h1>
          <p className="t3-subtitle">Two players · One device · Best of luck.</p>
        </header>

        <section className="t3-game-wrapper">
          <Game />
        </section>

        <footer className="t3-footer">
          <p className="t3-footer-text">
            Tip: Use the Reset button below the board to start a new round at any time.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
