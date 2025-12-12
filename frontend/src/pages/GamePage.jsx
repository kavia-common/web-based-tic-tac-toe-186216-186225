import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Game from '../components/Game.jsx';

/**
 * Game page that renders the Tic Tac Toe board using the selected configuration.
 *
 * PUBLIC_INTERFACE
 * Expects navigation state from ConfigPage:
 * - mode: "hvh" | "hvc"
 * - aiDifficulty: "easy" | "medium" | "hard" | null
 * - playerIcon: "X" | "O"
 *
 * If the user lands directly on /game without configuration, a sensible default
 * (vs-computer, medium, X) is used.
 */
function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};
  const mode = state.mode || 'hvc';
  const aiDifficulty = state.aiDifficulty || 'medium';
  const playerIcon = state.playerIcon || 'X';

  // If state is entirely missing, allow playing with defaults but provide an option
  // to go back and configure properly.
  const cameFromConfig = Boolean(location.state);

  const handleBack = () => {
    navigate('/config', {
      state: {
        initialMode: mode,
      },
    });
  };

  return (
    <div
      className="t3-card t3-card--game-page"
      role="group"
      aria-label="Tic Tac Toe game page"
    >
      {!cameFromConfig && (
        <div className="t3-inline-alert" role="status">
          <span className="t3-inline-alert-title">Quick start</span>
          <span className="t3-inline-alert-text">
            You opened the game directly. Using default settings:
            Vs Computer · Medium · You are {playerIcon}.
          </span>
        </div>
      )}

      <Game mode={mode} aiDifficulty={aiDifficulty} playerIcon={playerIcon} />

      <div className="t3-config-actions t3-config-actions--game-page">
        <button
          type="button"
          className="t3-button t3-button--secondary"
          onClick={() => navigate('/')}
          aria-label="Back to start page"
        >
          Back to start
        </button>
        <button
          type="button"
          className="t3-button t3-button--secondary"
          onClick={handleBack}
          aria-label="Change configuration and start a new game"
        >
          Change settings
        </button>
      </div>
    </div>
  );
}

export default GamePage;
