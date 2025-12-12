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
 * Both options route to the Config page with an initial mode hint, keeping
 * routing logic in the Config page.
 */
function StartPage() {
  const navigate = useNavigate();

  const goToConfig = (initialMode) => {
    navigate('/config', { state: { initialMode } });
  };

  return (
    <div
      className="t3-start-page"
      role="group"
      aria-label="Tic Tac Toe start screen"
    >
      <div className="t3-card t3-card--start">
        <header className="t3-start-header">
          <div className="t3-start-emblem" aria-hidden="true">
            <span className="t3-start-emblem-square t3-start-emblem-square--x" />
            <span className="t3-start-emblem-square t3-start-emblem-square--o" />
            <span className="t3-start-emblem-orb" />
          </div>
          <div className="t3-start-heading">
            <h2 className="t3-start-title">Tic Tac Toe Studio</h2>
            <p className="t3-start-tagline">
              A focused board for quick matches, thoughtful strategy, and AI-powered challenges.
            </p>
          </div>
        </header>

        <section className="t3-start-content" aria-label="Choose how you would like to play">
          <p className="t3-start-text">
            Start a local duel with a friend on one device or challenge the built-in computer
            across multiple difficulty levels. Your settings can be fine-tuned on the next screen.
          </p>

          <div
            className="t3-start-options"
            role="group"
            aria-label="Game mode selection"
          >
            <button
              type="button"
              className="t3-button t3-button--primary t3-start-button t3-start-button--primary"
              onClick={() => goToConfig('hvh')}
              aria-label="Continue to configuration with Single Player mode preselected for two humans on one device"
            >
              <span className="t3-start-button-main">Single Player</span>
              <span className="t3-start-button-caption">
                Two players · One device
              </span>
            </button>

            <button
              type="button"
              className="t3-button t3-button--secondary t3-start-button t3-start-button--secondary"
              onClick={() => goToConfig('hvc')}
              aria-label="Continue to configuration with Vs Computer mode preselected"
            >
              <span className="t3-start-button-main">Vs Computer</span>
              <span className="t3-start-button-caption">
                Challenge the AI
              </span>
            </button>
          </div>
        </section>

        <footer className="t3-start-footer" aria-label="Additional information">
          <p className="t3-start-footer-text">
            Version 0.1 · Keyboard friendly · Screen reader aware
          </p>
          <div className="t3-start-footer-links" aria-hidden="true">
            <span>Release notes</span>
            <span>Accessibility</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default StartPage;
