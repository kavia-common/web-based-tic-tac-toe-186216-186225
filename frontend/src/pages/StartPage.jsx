import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Landing page for the Tic Tac Toe app.
 *
 * PUBLIC_INTERFACE
 * Allows the user to choose between:
 * - "Single Player" (local two-player on one device)
 * - "Vs Computer" (human vs AI)
 *
 * Both options route to the Config page, which holds the actual configuration.
 */
function StartPage() {
  const navigate = useNavigate();

  const goToConfig = (initialMode) => {
    navigate('/config', { state: { initialMode } });
  };

  return (
    <div
      className="t3-card t3-card--start"
      role="group"
      aria-label="Tic Tac Toe start screen"
    >
      <div className="t3-status t3-status--turn" aria-live="polite">
        <span className="t3-status-label">Welcome</span>
        <span className="t3-status-message">Choose how you would like to play.</span>
      </div>

      <section className="t3-start-content">
        <p className="t3-start-text">
          Play a quick local match with a friend, or test your strategy against an AI opponent
          with adjustable difficulty.
        </p>

        <div className="t3-start-options" role="group" aria-label="Game mode selection">
          <button
            type="button"
            className="t3-button t3-button--primary t3-start-button"
            onClick={() => goToConfig('hvh')}
            aria-label="Configure a single player local match with two humans"
          >
            Single Player
            <span className="t3-start-button-caption">Two players · One device</span>
          </button>

          <button
            type="button"
            className="t3-button t3-button--secondary t3-start-button"
            onClick={() => goToConfig('hvc')}
            aria-label="Configure a game versus the computer"
          >
            Vs Computer
            <span className="t3-start-button-caption">Challenge the AI</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default StartPage;
