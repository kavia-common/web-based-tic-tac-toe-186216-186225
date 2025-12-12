import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Configuration page for selecting:
 * - Game mode: single player (hvh) vs vs-computer (hvc)
 * - Difficulty (Easy/Medium/Hard) for vs-computer mode
 * - Player icon: X or O
 *
 * PUBLIC_INTERFACE
 * On continue, navigates to "/game" carrying the selected configuration via
 * React Router's navigation state.
 */
function ConfigPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialModeFromState = location.state?.initialMode || 'hvc';

  const [mode, setMode] = useState(initialModeFromState); // 'hvh' | 'hvc'
  const [difficulty, setDifficulty] = useState('medium'); // easy | medium | hard
  const [playerIcon, setPlayerIcon] = useState('X'); // X | O

  useEffect(() => {
    // Ensure mode from Start page is reflected on first render.
    setMode(initialModeFromState);
  }, [initialModeFromState]);

  const handleContinue = () => {
    navigate('/game', {
      state: {
        mode,
        aiDifficulty: mode === 'hvc' ? difficulty : null,
        playerIcon,
      },
    });
  };

  const isVsComputer = mode === 'hvc';

  return (
    <div
      className="t3-card t3-card--config"
      role="form"
      aria-label="Configure Tic Tac Toe game"
    >
      <div className="t3-status t3-status--turn">
        <span className="t3-status-label">Setup</span>
        <span className="t3-status-message">Choose your mode, difficulty, and icon.</span>
      </div>

      <section className="t3-config-section" aria-labelledby="game-mode-heading">
        <h2 id="game-mode-heading" className="t3-config-title">
          Game mode
        </h2>
        <div
          className="t3-segmented-control"
          role="radiogroup"
          aria-label="Game mode"
        >
          <button
            type="button"
            className={`t3-segmented-option ${mode === 'hvh' ? 't3-segmented-option--active' : ''}`}
            onClick={() => setMode('hvh')}
            role="radio"
            aria-checked={mode === 'hvh'}
            aria-label="Single Player, two humans on one device"
          >
            Single Player
            <span className="t3-segmented-caption">Two humans</span>
          </button>
          <button
            type="button"
            className={`t3-segmented-option ${mode === 'hvc' ? 't3-segmented-option--active' : ''}`}
            onClick={() => setMode('hvc')}
            role="radio"
            aria-checked={mode === 'hvc'}
            aria-label="Vs Computer mode"
          >
            Vs Computer
            <span className="t3-segmented-caption">Human vs AI</span>
          </button>
        </div>
      </section>

      <section
        className={`t3-config-section ${!isVsComputer ? 't3-config-section--disabled' : ''}`}
        aria-labelledby="difficulty-heading"
        aria-disabled={!isVsComputer}
      >
        <h2 id="difficulty-heading" className="t3-config-title">
          Difficulty
        </h2>
        <p className="t3-config-helper">
          Difficulty applies only when playing against the computer.
        </p>
        <div
          className="t3-segmented-control"
          role="radiogroup"
          aria-label="AI difficulty"
        >
          <button
            type="button"
            className={`t3-segmented-option ${difficulty === 'easy' ? 't3-segmented-option--active' : ''}`}
            onClick={() => isVsComputer && setDifficulty('easy')}
            role="radio"
            aria-checked={difficulty === 'easy'}
            aria-disabled={!isVsComputer}
            disabled={!isVsComputer}
          >
            Easy
            <span className="t3-segmented-caption">Random moves</span>
          </button>
          <button
            type="button"
            className={`t3-segmented-option ${difficulty === 'medium' ? 't3-segmented-option--active' : ''}`}
            onClick={() => isVsComputer && setDifficulty('medium')}
            role="radio"
            aria-checked={difficulty === 'medium'}
            aria-disabled={!isVsComputer}
            disabled={!isVsComputer}
          >
            Medium
            <span className="t3-segmented-caption">Win &amp; block smartly</span>
          </button>
          <button
            type="button"
            className={`t3-segmented-option ${difficulty === 'hard' ? 't3-segmented-option--active' : ''}`}
            onClick={() => isVsComputer && setDifficulty('hard')}
            role="radio"
            aria-checked={difficulty === 'hard'}
            aria-disabled={!isVsComputer}
            disabled={!isVsComputer}
          >
            Hard
            <span className="t3-segmented-caption">Unbeatable AI</span>
          </button>
        </div>
      </section>

      <section className="t3-config-section" aria-labelledby="player-icon-heading">
        <h2 id="player-icon-heading" className="t3-config-title">
          Player icon
        </h2>
        <div
          className="t3-segmented-control"
          role="radiogroup"
          aria-label="Choose your symbol"
        >
          <button
            type="button"
            className={`t3-segmented-option ${playerIcon === 'X' ? 't3-segmented-option--active' : ''}`}
            onClick={() => setPlayerIcon('X')}
            role="radio"
            aria-checked={playerIcon === 'X'}
            aria-label="Play as X"
          >
            X
            <span className="t3-segmented-caption">Moves first</span>
          </button>
          <button
            type="button"
            className={`t3-segmented-option ${playerIcon === 'O' ? 't3-segmented-option--active' : ''}`}
            onClick={() => setPlayerIcon('O')}
            role="radio"
            aria-checked={playerIcon === 'O'}
            aria-label="Play as O"
          >
            O
            <span className="t3-segmented-caption">Moves second</span>
          </button>
        </div>
      </section>

      <div className="t3-config-actions">
        <button
          type="button"
          className="t3-button t3-button--secondary"
          onClick={() => navigate('/')}
          aria-label="Back to start page"
        >
          Back
        </button>
        <button
          type="button"
          className="t3-button t3-button--primary"
          onClick={handleContinue}
          aria-label="Continue to game with selected configuration"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ConfigPage;
