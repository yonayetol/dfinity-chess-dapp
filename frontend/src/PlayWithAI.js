import React, { useState, useEffect } from 'react';
import ChessBoard from './ChessBoard';

export default function PlayWithAI({ onBack }) {
  const [fen, setFen] = useState('');
  const [gameOver, setGameOver] = useState('');

  useEffect(() => {
    fetch('/reset')
      .then(response => response.json())
      .then(data => setFen(data.fen))
      .catch(() => alert('Failed to load game. Please try again.'));
  }, []);

  const handleMove = (from, to) => {
    fetch(`/move/${from}-${to}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setFen(data.fen);
          if (data.aiMove) {
            alert(`AI moved: ${data.aiMove}`);
          }
          // Check for game over
          if (data.fen.split(' ')[1] === '-') {
            setGameOver('Game Over');
          }
        }
      })
      .catch(() => alert('Move failed. Please try again.'));
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      <ChessBoard
        fen={fen}
        onMove={handleMove}
        isMyTurn={fen.split(' ')[1] === 'w'}
        orientation={'white'}
      />
      {gameOver && <div className="mt-4 text-2xl font-bold text-red-600">{gameOver}</div>}
      <button className="btn mt-4" onClick={onBack}>Back</button>
    </div>
  );
}
