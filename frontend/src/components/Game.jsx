import React, { useMemo, useState } from 'react';
import Board from './Board.jsx';

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
 * Top-level game state container.
 *
 * Manages:
 * - board state
 * - current player
 * - derived game status (turn, win, draw)
 * - optional move history (with simple jump-to-move navigation)
 *
 * No backend calls are made; everything is computed on the client.
 */
// PUBLIC_INTERFACE
function Game() {
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

  const statusMessage = useMemo(() => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (isDraw) {
      return 'Draw: No more moves left.';
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  }, [winner, isDraw, xIsNext]);

  const statusToneClass = winner
    ? 't3-status--winner'
    : isDraw
      ? 't3-status--draw'
      : 't3-status--turn';

  const handleCellClick = (index) => {
    if (gameOver || currentBoard[index]) {
      return;
    }

    const nextBoard = currentBoard.slice();
    nextBoard[index] = xIsNext ? 'X' : 'O';

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

  const canUndo = currentMove > 0;
  const canRedo = currentMove < history.length - 1;

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

  return (
    <div className="t3-card" role="group" aria-label="Tic Tac Toe game area">
      <div className={`t3-status ${statusToneClass}`} aria-live="polite">
        <span className="t3-status-label">Game status</span>
        <span className="t3-status-message">{statusMessage}</span>
      </div>

      <div className="t3-board-wrapper">
        <Board
          squares={currentBoard}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          gameOver={gameOver}
        />
      </div>

      <div className="t3-controls">
        <button
          type="button"
          className="t3-button t3-button--primary"
          onClick={handleReset}
        >
          Reset game
        </button>
        <div className="t3-controls-group">
          <button
            type="button"
            className="t3-button t3-button--secondary"
            onClick={handleUndo}
            disabled={!canUndo}
          >
            Undo
          </button>
          <button
            type="button"
            className="t3-button t3-button--secondary"
            onClick={handleRedo}
            disabled={!canRedo}
          >
            Redo
          </button>
        </div>
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
