import React from 'react';

/**
 * Single Tic Tac Toe cell.
 *
 * Props:
 * - index: number - zero-based index in the board
 * - value: "X" | "O" | null
 * - onClick: () => void
 * - isWinningCell: boolean - highlights the cell when part of the winning line
 * - row: number - 1-based row index (for aria-label)
 * - col: number - 1-based column index (for aria-label)
 * - gameOver: boolean - disables interaction when true
 */
// PUBLIC_INTERFACE
function Cell({
  index,
  value,
  onClick,
  isWinningCell,
  row,
  col,
  gameOver,
}) {
  const symbol = value || 'Empty';
  const ariaLabel = `Row ${row}, column ${col}, ${symbol}`;

  return (
    <button
      type="button"
      className={`t3-cell ${value ? 't3-cell--filled' : ''} ${isWinningCell ? 't3-cell--winner' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={Boolean(value)}
      disabled={Boolean(gameOver || value)}
    >
      <span className="t3-cell-symbol" aria-hidden="true">
        {value}
      </span>
    </button>
  );
}

export default Cell;
