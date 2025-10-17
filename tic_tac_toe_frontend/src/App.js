import React, { useMemo, useState } from 'react';
import Board from './components/Board';
import './App.css';
import './index.css';

/**
 * App is the main entry for the Tic-Tac-Toe game.
 * It manages the game state, turn logic, win/draw detection, and UI controls.
 */
// PUBLIC_INTERFACE
export default function App() {
  // Game state: history for optional undo; current step index
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[step];

  const { winner, line: winLine } = useMemo(() => calculateWinner(current), [current]);
  const isDraw = useMemo(() => !winner && current.every(Boolean), [winner, current]);

  const statusText = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw!'
      : `Turn: ${xIsNext ? 'X' : 'O'}`;

  const gameFinished = Boolean(winner) || isDraw;

  const handleSquareClick = (index) => {
    if (gameFinished || current[index]) return;

    const next = current.slice();
    next[index] = xIsNext ? 'X' : 'O';

    const nextHistory = history.slice(0, step + 1);
    setHistory([...nextHistory, next]);
    setStep(nextHistory.length);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStep(0);
    setXIsNext(true);
  };

  // PUBLIC_INTERFACE (optional)
  const undoMove = () => {
    if (step > 0 && !winner) {
      setStep(step - 1);
      setXIsNext((prev) => !prev);
    }
  };

  return (
    <div className="page-shell">
      <div className="app-container">
        <header className="app-header">
          <h1 className="title">Tic-Tac-Toe</h1>
          <p className={`status ${winner ? 'win' : isDraw ? 'draw' : ''}`}>
            {statusText}
          </p>
        </header>

        <main className="game-area">
          <Board
            squares={current}
            onSquareClick={handleSquareClick}
            disabled={Boolean(winner)}
            winLine={winLine}
          />
        </main>

        <section className="controls">
          <button className="btn primary" onClick={resetGame} aria-label="Reset game">
            Reset
          </button>
          <button
            className="btn ghost"
            onClick={undoMove}
            disabled={step === 0 || Boolean(winner)}
            aria-label="Undo last move"
            title="Undo last move"
          >
            Undo
          </button>
        </section>

        <footer className="footer">
          <small>Two players, local play. Ocean Professional theme.</small>
        </footer>
      </div>
    </div>
  );
}

/**
 * Calculate winner for the current board.
 * Returns { winner: 'X' | 'O' | null, line: number[] | null }
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}
