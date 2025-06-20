import React, { useState } from 'react';
import { Chess } from 'chess.js';

const pieceUnicode = {
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚',
  P: '♙', N: '♘', B: '♗', R: '♖', Q: '♕', K: '♔'
};

function getSquareColor(i, j) {
  return (i + j) % 2 === 1 ? 'bg-yellow-600' : 'bg-yellow-200';
}

export default function ChessBoard({ fen, onMove, isMyTurn, orientation }) {
  const [chess, setChess] = useState(new Chess(fen));
  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const board = orientation === 'black'
    ? chess.board().slice().reverse()
    : chess.board();

  const handleSquareClick = (i, j) => {
    if (!isMyTurn) return;
    const file = String.fromCharCode('a'.charCodeAt(0) + j);
    const rank = orientation === 'black' ? i + 1 : 8 - i;
    const square = `${file}${rank}`;

    if (selected) {
      try {
        const moveResult = chess.move({ from: selected, to: square, promotion: 'q' });
        if (moveResult) {
          onMove(selected, square);
          setChess(new Chess(chess.fen()));
        }
      } catch (e) {
        console.log("Invalid move:", e);
      }
      setSelected(null);
      setLegalMoves([]);
    } else {
      const piece = chess.get(square);
      if (piece) {
        setSelected(square);
        setLegalMoves(chess.moves({ square, verbose: true }).map(m => m.to));
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">♔ Chess Battle ♔</h2>
        <div className="flex justify-center items-center space-x-8 text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <span>White Player</span>
          </div>
          <div className="text-lg font-bold text-primary-400">
            {isMyTurn ? 'Your Turn' : 'Opponent\'s Turn'}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-black rounded-full border border-gray-600"></div>
            <span>Black Player</span>
          </div>
        </div>
      </div>

      {/* Chess Board Container */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Board Border with Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-xl"></div>
          <div className="relative bg-gray-900 p-4 rounded-xl border border-white/10">
            <div className="grid grid-cols-8 w-96 h-96 border-4 border-yellow-600 rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-yellow-600/20 to-yellow-200/20">
              {board.map((row, i) =>
                row.map((piece, j) => {
                  const rank = orientation === 'black' ? i + 1 : 8 - i;
                  const file = String.fromCharCode('a'.charCodeAt(0) + j);
                  const square = `${file}${rank}`;
                  const isSelected = selected === square;
                  const isLegal = legalMoves.includes(square);

                  return (
                    <div
                      key={`${i}-${j}`}
                      className={`relative flex items-center justify-center ${getSquareColor(i, j)} ${isSelected ? 'ring-4 ring-blue-400 glow-effect' : ''} ${isLegal ? 'ring-2 ring-green-400' : ''} transition-all duration-300 hover:scale-105`}
                      style={{
                        width: '4rem',
                        height: '4rem',
                        fontSize: '3.5rem',
                        cursor: isMyTurn ? 'pointer' : 'default'
                      }}
                      onClick={() => handleSquareClick(i, j)}
                    >
                      {piece && (
                        <div className={`chess-piece ${isSelected ? 'animate-bounce' : ''}`}>
                          {pieceUnicode[piece.type]}
                        </div>
                      )}
                      {/* Square coordinates */}
                      {(i === 7 || j === 0) && (
                        <div className="absolute text-xs text-gray-600 font-bold">
                          {i === 7 && j === 0 && (
                            <div className="absolute top-1 left-1">a1</div>
                          )}
                          {i === 7 && j === 7 && (
                            <div className="absolute top-1 right-1">h1</div>
                          )}
                          {i === 0 && j === 0 && (
                            <div className="absolute bottom-1 left-1">a8</div>
                          )}
                          {i === 0 && j === 7 && (
                            <div className="absolute bottom-1 right-1">h8</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button className="btn px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
          Resign
        </button>
        <button className="btn px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700">
          Draw Offer
        </button>
        <button className="btn px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700">
          New Game
        </button>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="game-container p-4">
            <div className="text-2xl font-bold text-primary-400">12</div>
            <div className="text-sm text-gray-400">Moves</div>
          </div>
          <div className="game-container p-4">
            <div className="text-2xl font-bold text-secondary-400">5:30</div>
            <div className="text-sm text-gray-400">Time Left</div>
          </div>
          <div className="game-container p-4">
            <div className="text-2xl font-bold text-accent-400">+2.5</div>
            <div className="text-sm text-gray-400">Advantage</div>
          </div>
        </div>
      </div>
    </div>
  );
}
