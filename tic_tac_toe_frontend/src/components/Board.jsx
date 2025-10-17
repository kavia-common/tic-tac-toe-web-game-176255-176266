import React from 'react';
import Square from './Square';

/**
 * Board component renders the 3x3 grid of squares and highlights winning line.
 */
// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, disabled, winLine }) {
  /**
   * Props:
   * - squares: array of 9 elements representing board state
   * - onSquareClick: function(index) to handle click
   * - disabled: boolean to disable all interactions
   * - winLine: array of indices that form a winning line (or null)
   */
  const renderSquare = (i) => {
    const highlight = Array.isArray(winLine) && winLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        disabled={disabled}
        highlight={highlight}
      />
    );
  };

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      <div className="row" role="row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="row" role="row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="row" role="row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
