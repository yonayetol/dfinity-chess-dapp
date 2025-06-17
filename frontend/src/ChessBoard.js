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
  const chess = new Chess(fen);
  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const board = orientation === 'black'
    ? chess.board().slice().reverse()
    : chess.board();

  const handleSquareClick = (i, j) => {
    if (!isMyTurn) return;
    const file = String.fromCharCode('a'.charCodeAt(0) + j);
    const rank = orientation === 'black' ? 8 - i : i + 1;
    const square = `${file}${rank}`;

    if (selected) {
      // Try move
      const move = { from: selected, to: square };
      if (legalMoves.includes(square)) {
        onMove(selected, square);
        setSelected(null);
        setLegalMoves([]);
      } else {
        setSelected(null);
        setLegalMoves([]);
      }
    } else {
      // Select piece
      const piece = chess.get(square);
      if (piece && ((piece.color === 'w' && orientation === 'white') || (piece.color === 'b' && orientation === 'black'))) {
        setSelected(square);
        setLegalMoves(chess.moves({ square, verbose: true }).map(m => m.to));
      }
    }
  };

  return (
    <div className="grid grid-cols-8 w-96 h-96 border-4 border-yellow-600 rounded-lg overflow-hidden shadow-2xl">
      {board.map((row, i) =>
        row.map((piece, j) => {
          const file = String.fromCharCode('a'.charCodeAt(0) + j);
          const rank = orientation === 'black' ? 8 - i : i + 1;
          const square = `${file}${rank}`;
          const isSelected = selected === square;
          const isLegal = legalMoves.includes(square);

          return (
            <div
              key={square}
              className={`relative flex items-center justify-center ${getSquareColor(i, j)} ${isSelected ? 'ring-4 ring-blue-400' : ''} ${isLegal ? 'ring-2 ring-green-400' : ''}`}
              style={{ width: '3rem', height: '3rem', fontSize: '2rem', cursor: isMyTurn ? 'pointer' : 'default' }}
              onClick={() => handleSquareClick(i, j)}
            >
              {piece ? pieceUnicode[piece.type === piece.type.toLowerCase() ? piece.type : piece.type.toUpperCase()] : ''}
            </div>
          );
        })
      )}
    </div>
  );
}
