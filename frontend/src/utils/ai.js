import { calculateWinner } from '../components/Game.jsx';

/**
 * Determine whether the board is full (no null cells).
 *
 * @param {Array<string|null>} squares - Current board.
 * @returns {boolean} True when the board has no empty cells.
 */
function isBoardFull(squares) {
  return squares.every((cell) => cell !== null);
}

/**
 * Get a list of indices for all empty cells.
 *
 * @param {Array<string|null>} squares - Current board.
 * @returns {number[]} Array of empty cell indices.
 */
function getAvailableMoves(squares) {
  const moves = [];
  for (let i = 0; i < squares.length; i += 1) {
    if (squares[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Easy AI: choose a random available move.
 *
 * PUBLIC_INTERFACE
 * @param {Array<string|null>} squares - Current board.
 * @returns {number|null} Index for AI move, or null if no moves.
 */
export function getEasyMove(squares) {
  const available = getAvailableMoves(squares);
  if (available.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

/**
 * Medium AI:
 * - If AI can win on this move, take that move.
 * - Else, if the opponent can win next move, block them.
 * - Else, make a random available move.
 *
 * PUBLIC_INTERFACE
 * @param {Array<string|null>} squares - Current board.
 * @param {"X"|"O"} aiPlayer - The AI symbol.
 * @param {"X"|"O"} humanPlayer - The human symbol.
 * @returns {number|null} Index for AI move, or null if no moves.
 */
export function getMediumMove(squares, aiPlayer, humanPlayer) {
  const available = getAvailableMoves(squares);
  if (available.length === 0) return null;

  // 1. Try to find a winning move for the AI.
  for (const move of available) {
    const testBoard = squares.slice();
    testBoard[move] = aiPlayer;
    const { winner } = calculateWinner(testBoard);
    if (winner === aiPlayer) {
      return move;
    }
  }

  // 2. Try to block the human player's winning move.
  for (const move of available) {
    const testBoard = squares.slice();
    testBoard[move] = humanPlayer;
    const { winner } = calculateWinner(testBoard);
    if (winner === humanPlayer) {
      return move;
    }
  }

  // 3. Fall back to a random move.
  return getEasyMove(squares);
}

/**
 * Hard AI: minimax-based optimal play, with simple optimizations:
 * - Prefer center, then corners, then edges when scores tie.
 * - Use depth in scoring so faster wins are preferred and slower losses are delayed.
 *
 * PUBLIC_INTERFACE
 * @param {Array<string|null>} squares - Current board.
 * @param {"X"|"O"} aiPlayer - The AI symbol.
 * @param {"X"|"O"} humanPlayer - The human symbol.
 * @returns {number|null} Index for AI move, or null if no moves.
 */
export function getHardMove(squares, aiPlayer, humanPlayer) {
  const available = getAvailableMoves(squares);
  if (available.length === 0) return null;

  /**
   * Score the board from the perspective of aiPlayer.
   *
   * @param {Array<string|null>} board - Board state.
   * @param {number} depth - Current depth to prefer faster wins.
   * @param {boolean} isMaximizing - True if AI's turn, false for human.
   * @returns {number} Score.
   */
  function minimax(board, depth, isMaximizing) {
    const { winner } = calculateWinner(board);
    if (winner === aiPlayer) {
      return 10 - depth; // prefer quicker wins
    }
    if (winner === humanPlayer) {
      return depth - 10; // prefer to delay losses
    }
    if (isBoardFull(board)) {
      return 0; // draw
    }

    const moves = getAvailableMoves(board);

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of moves) {
        const nextBoard = board.slice();
        nextBoard[move] = aiPlayer;
        const score = minimax(nextBoard, depth + 1, false);
        if (score > bestScore) {
          bestScore = score;
        }
      }
      return bestScore;
    }

    let bestScore = Infinity;
    for (const move of moves) {
      const nextBoard = board.slice();
      nextBoard[move] = humanPlayer;
      const score = minimax(nextBoard, depth + 1, true);
      if (score < bestScore) {
        bestScore = score;
      }
    }
    return bestScore;
  }

  // Helper for tie-breaking: center > corners > edges.
  const movePriority = (index) => {
    if (index === 4) return 3; // center
    if ([0, 2, 6, 8].includes(index)) return 2; // corners
    return 1; // edges
  };

  let bestScore = -Infinity;
  let bestMove = available[0];

  for (const move of available) {
    const boardCopy = squares.slice();
    boardCopy[move] = aiPlayer;
    const score = minimax(boardCopy, 0, false);

    if (
      score > bestScore ||
      (score === bestScore && movePriority(move) > movePriority(bestMove))
    ) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
