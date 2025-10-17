import React from 'react';

/**
 * Square component represents an individual cell in the Tic-Tac-Toe board.
 * Handles rendering, accessibility, and click interaction.
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, highlight }) {
  /** This component renders a button styled as a square.
   * Props:
   * - value: 'X', 'O', or null
   * - onClick: function to call when square is clicked
   * - disabled: boolean to disable interactions (e.g., after win)
   * - highlight: boolean to visually emphasize a winning square
   */
  return (
    <button
      className={`ttt-square ${highlight ? 'highlight' : ''} ${value ? 'filled' : ''}`}
      onClick={onClick}
      disabled={disabled || Boolean(value)}
      aria-label={`Square ${value ? value : 'empty'}`}
    >
      <span className={`mark ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`}>{value}</span>
    </button>
  );
}
