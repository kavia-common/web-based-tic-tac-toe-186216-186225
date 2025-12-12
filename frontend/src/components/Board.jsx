import React from 'react';
import Cell from './Cell.jsx';

/**
 * Board component responsible for rendering a 3x3 grid of cells.
 *
 * It delegates click handling to the parent Game component.
 *
 * Props:
 * - squares: string[] | (null)[] - linear array of 9 values ("X", "O", or null)
 * - onCellClick: (index: number) => void - invoked when a cell is clicked
 * - winningLine: number[] | null - indices belonging to the winning line
 * - gameOver: boolean - when true, announces game end for accessibility
 */
// PUBLIC_INTERFACE
function Board({ squares, onCellClick, winningLine, gameOver }) {
  const renderCell = (index) => {
    const value = squares[index];
    const isWinningCell = Boolean(winningLine && winningLine.includes(index));

    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;

    return (
      <Cell
        key={index}
        index={index}
        value={value}
        onClick={() => onCellClick(index)}
        isWinningCell={isWinningCell}
        row={row}
        col={col}
        gameOver={gameOver}
      />
    );
  };

  return (
    <div
      className="t3-board"
      role="grid"
      aria-label="Tic Tac Toe 3 by 3 game board"
      aria-live="polite"
    >
      {Array.from({ length: 9 }, (_, index) => renderCell(index))}
    </div>
  );
}

export default Board;
