import React, { useEffect, useMemo, useState } from 'react';
import Board from './Board.jsx';
import { getEasyMove, getHardMove, getMediumMove } from '../utils/ai.js';

const INITIAL_BOARD = Array(9).fill(null);

/**
 * Calculate winner and winning line for a given board state.
 *
 * @param {Array<string|null>} squares - Linear array of 9 cells.
 * @returns {{winner: string|null, line: number[]|null}} - Winner symbol and winning indices.
 */
// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /** Determine the winner of the given Tic Tac Toe board. */
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const symbol = squares[a];
    if (symbol && symbol === squares[b] && symbol === squares[c]) {
      return { winner: symbol, line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
}

/**
 * Resolve a difficulty label into a human-readable string.
 *
 * @param {"easy"|"medium"|"hard"|null} difficulty - Difficulty identifier.
 * @returns {string} Human readable difficulty.
 */
function getDifficultyLabel(difficulty) {
  if (!difficulty) return '—';
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return '—';
  }
}

/**
 * Top-level game state container.
 *
 * PUBLIC_INTERFACE
 * @param {Object} props - Game configuration.
 * @param {"hvh"|"hvc"} props.mode - Game mode: human vs human ("hvh") or human vs computer ("hvc").
 * @param {"easy"|"medium"|"hard"} [props.aiDifficulty="easy"] - AI difficulty when in "hvc" mode.
 * @param {"X"|"O"} [props.playerIcon="X"] - Human player's icon when in "hvc" mode.
 *
 * In hvh mode, the game behaves as a classic two-player local Tic Tac Toe with undo/redo.
 * In hvc mode, the human always moves as `playerIcon`, and the AI plays the other symbol.
 * The board disables interaction while it is the AI's turn or after game over.
 */
 // PUBLIC_INTERFACE
function Game({ mode = 'hvh', aiDifficulty = 'easy', playerIcon = 'X' }) {
  const isVsComputer = mode === 'hvc';

  const [history, setHistory] = useState([INITIAL_BOARD]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentBoard = history[currentMove];

  const { winner, line: winningLine } = useMemo(
    () => calculateWinner(currentBoard),
    [currentBoard],
  );

  const isBoardFull = useMemo(
    () => currentBoard.every((cell) => cell !== null),
    [currentBoard],
  );
  const isDraw = !winner && isBoardFull;
  const gameOver = Boolean(winner || isDraw);

  const humanSymbol = isVsComputer ? playerIcon : null;
  const aiSymbol = isVsComputer ? (playerIcon === 'X' ? 'O' : 'X') : null;

  const currentPlayerSymbol = xIsNext ? 'X' : 'O';
  const isHumanTurn = !isVsComputer || currentPlayerSymbol === humanSymbol;
  const isAITurn = isVsComputer && currentPlayerSymbol === aiSymbol;

  const statusMessage = useMemo(() => {
    if (winner) {
      if (isVsComputer) {
        if (winner === humanSymbol) return `You win! (${winner})`;
        if (winner === aiSymbol) return `Computer wins. (${winner})`;
      }
      return `Winner: ${winner}`;
    }
    if (isDraw) {
      return 'Draw: No more moves left.';
    }
    if (isVsComputer) {
      return isHumanTurn
        ? `Your turn: ${currentPlayerSymbol}`
        : `Computer is thinking… (${currentPlayerSymbol})`;
    }
    return `Next player: ${currentPlayerSymbol}`;
  }, [
    winner,
    isDraw,
    isVsComputer,
    isHumanTurn,
    currentPlayerSymbol,
    humanSymbol,
    aiSymbol,
  ]);

  const statusToneClass = winner
    ? 't3-status--winner'
    : isDraw
      ? 't3-status--draw'
      : 't3-status--turn';

  const handleCellClick = (index) => {
    // Block interaction when:
    // - game is over, or
    // - the target cell is already filled, or
    // - it is the AI's turn in vs-computer mode.
    if (gameOver || currentBoard[index] || isAITurn) {
      return;
    }

    const nextBoard = currentBoard.slice();
    nextBoard[index] = currentPlayerSymbol;

    const nextHistory = history.slice(0, currentMove + 1);
    nextHistory.push(nextBoard);

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setHistory([INITIAL_BOARD]);
    setCurrentMove(0);
    setXIsNext(true);
  };

  const canUndo = !isVsComputer && currentMove > 0;
  const canRedo = !isVsComputer && currentMove < history.length - 1;

  const handleUndo = () => {
    if (!canUndo) return;
    const previousMove = currentMove - 1;
    setCurrentMove(previousMove);

    // Recompute whose turn based on move index (even index -> X's turn)
    setXIsNext(previousMove % 2 === 0);
  };

  const handleRedo = () => {
    if (!canRedo) return;
    const nextMove = currentMove + 1;
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  };

  /**
   * Trigger AI move when:
   * - The mode is vs-computer.
   * - It is currently the AI's turn.
   * - The game is not over.
   */
  useEffect(() => {
    if (!isVsComputer || !isAITurn || gameOver) {
      return;
    }

    let cancelled = false;

    const makeAIMove = () => {
      const boardCopy = currentBoard.slice();
      let aiMoveIndex = null;

      if (aiDifficulty === 'hard') {
        aiMoveIndex = getHardMove(boardCopy, aiSymbol, humanSymbol);
      } else if (aiDifficulty === 'medium') {
        aiMoveIndex = getMediumMove(boardCopy, aiSymbol, humanSymbol);
      } else {
        aiMoveIndex = getEasyMove(boardCopy);
      }

      if (aiMoveIndex === null || cancelled) {
        return;
      }

      const newBoard = boardCopy.slice();
      if (newBoard[aiMoveIndex] !== null) {
        // Extremely unlikely: stale state; bail out defensively.
        return;
      }
      newBoard[aiMoveIndex] = aiSymbol;

      setHistory((prevHistory) => {
        const trimmed = prevHistory.slice(0, currentMove + 1);
        return [...trimmed, newBoard];
      });
      setCurrentMove((prevMove) => prevMove + 1);
      setXIsNext((prev) => !prev);
    };

    // Small timeout to feel more natural and ensure state has settled.
    const timeoutId = window.setTimeout(makeAIMove, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [
    aiDifficulty,
    aiSymbol,
    currentBoard,
    currentMove,
    gameOver,
    humanSymbol,
    isAITurn,
    isVsComputer,
  ]);

  return (
    <div className="t3-card" role="group" aria-label="Tic Tac Toe game area">
      <div className={`t3-status ${statusToneClass}`} aria-live="polite">
        <span className="t3-status-label">Game status</span>
        <span className="t3-status-message">{statusMessage}</span>
      </div>

      <div className="t3-meta t3-meta--game-info" aria-label="Game configuration">
        <div className="t3-chip-row">
          <span className="t3-chip" aria-label={`Mode: ${isVsComputer ? 'Vs Computer' : 'Two players'}`}>
            <span className="t3-chip-label">Mode</span>
            <span className="t3-chip-value">{isVsComputer ? 'Vs Computer' : 'Two players'}</span>
          </span>
          <span
            className="t3-chip"
            aria-label={`Difficulty: ${getDifficultyLabel(isVsComputer ? aiDifficulty : null)}`}
          >
            <span className="t3-chip-label">Difficulty</span>
            <span className="t3-chip-value">
              {isVsComputer ? getDifficultyLabel(aiDifficulty) : '—'}
            </span>
          </span>
          <span
            className="t3-chip"
            aria-label={`Your icon: ${isVsComputer ? humanSymbol : 'Both'}`}
          >
            <span className="t3-chip-label">Player icon</span>
            <span className="t3-chip-value">
              {isVsComputer ? humanSymbol : 'X & O'}
            </span>
          </span>
        </div>
      </div>

      <div className="t3-board-wrapper">
        <Board
          squares={currentBoard}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          gameOver={gameOver || isAITurn}
        />
      </div>

      <div className="t3-controls">
        <button
          type="button"
          className="t3-button t3-button--primary"
          onClick={handleReset}
          aria-label="Reset the current game"
        >
          Reset game
        </button>
        {!isVsComputer && (
          <div className="t3-controls-group">
            <button
              type="button"
              className="t3-button t3-button--secondary"
              onClick={handleUndo}
              disabled={!canUndo}
              aria-label="Undo last move"
            >
              Undo
            </button>
            <button
              type="button"
              className="t3-button t3-button--secondary"
              onClick={handleRedo}
              disabled={!canRedo}
              aria-label="Redo move"
            >
              Redo
            </button>
          </div>
        )}
      </div>

      <div className="t3-meta">
        <p className="t3-meta-text">
          Move {currentMove} of {history.length - 1}
        </p>
      </div>
    </div>
  );
}

export default Game;
