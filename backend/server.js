import express from 'express';
import { Chess } from 'chess.js';

const app = express();

const game = {
  chess: new Chess(),
  timers: { white: 300, black: 300 },
  turn: 'w',
  lastMove: Date.now(),
};

app.get('/move/:from-:to', (req, res) => {
  const { from, to } = req.params;
  const move = { from, to };
  const result = game.chess.move(move);
  if (result) {
    game.turn = game.chess.turn();
    game.lastMove = Date.now();
    // AI makes a random move
    const possibleMoves = game.chess.moves();
    if (possibleMoves.length > 0) {
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      game.chess.move(randomMove);
      game.turn = game.chess.turn();
      game.lastMove = Date.now();
    }
    res.json({ fen: game.chess.fen(), move: result, aiMove: randomMove });
  } else {
    res.status(400).json({ error: 'Invalid move' });
  }
});

app.get('/reset', (req, res) => {
  game.chess = new Chess();
  game.timers = { white: 300, black: 300 };
  game.turn = 'w';
  game.lastMove = Date.now();
  res.json({ fen: game.chess.fen() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
