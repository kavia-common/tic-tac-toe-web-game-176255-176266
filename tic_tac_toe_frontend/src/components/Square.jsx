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

  // Map internal values to chess icons and labels
  const renderContent = () => {
    if (value === 'X') {
      return (
        <span className="mark mark-icon x" role="img" aria-label="Knight">
          ♞
        </span>
      );
    }
    if (value === 'O') {
      return (
        <span className="mark mark-icon o" role="img" aria-label="Queen">
          ♛
        </span>
      );
    }
    return <span className="mark mark-empty" aria-hidden="true"></span>;
  };

  const ariaLabel = value === 'X' ? 'Square with Knight'
    : value === 'O' ? 'Square with Queen'
    : 'Square empty';

  return (
    <button
      className={`ttt-square ${highlight ? 'highlight' : ''} ${value ? 'filled' : ''}`}
      onClick={onClick}
      disabled={disabled || Boolean(value)}
      aria-label={ariaLabel}
    >
      {renderContent()}
    </button>
  );
}
