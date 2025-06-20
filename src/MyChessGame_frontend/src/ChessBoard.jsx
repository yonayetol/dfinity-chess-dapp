import React, { useState, useEffect } from 'react';

export default function ChessBoard({ fen, onMove, isMyTurn, orientation, gameData }) {
  const [whiteTimeLeft, setWhiteTimeLeft] = useState(gameData?.duration * 60 || 300);
  const [blackTimeLeft, setBlackTimeLeft] = useState(gameData?.duration * 60 || 300);

  useEffect(() => {
    if (gameData && !isMyTurn && whiteTimeLeft > 0) {
      const timerId = setTimeout(() => setWhiteTimeLeft(whiteTimeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [whiteTimeLeft, isMyTurn, gameData]);

  useEffect(() => {
    if (gameData && isMyTurn && blackTimeLeft > 0) {
      const timerId = setTimeout(() => setBlackTimeLeft(blackTimeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [blackTimeLeft, isMyTurn, gameData]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Game Header with Player Names and Betting Info */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-4">♔ Epic Chess Battle ♔</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="game-container p-4 flex-1 mr-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center text-3xl text-black">♔</div>
              <div className="text-left">
                <div className="text-lg font-bold text-white">{gameData?.createdBy || 'Player 1'}</div>
                <div className="text-xl font-bold text-white">{formatTime(whiteTimeLeft)}</div>
              </div>
            </div>
          </div>
          <div className="game-container p-4 bg-gradient-to-r from-accent-500/20 to-accent-600/20 border border-accent-400/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-400">${gameData?.betAmount || 0}</div>
              <div className="text-sm text-gray-400">Prize Pool</div>
            </div>
          </div>
          <div className="game-container p-4 flex-1 ml-4">
            <div className="flex items-center space-x-3 justify-end">
              <div className="text-right">
                <div className="text-lg font-bold text-white">You</div>
                <div className="text-xl font-bold text-white">{formatTime(blackTimeLeft)}</div>
              </div>
              <div className="w-12 h-12 bg-black rounded-full border-2 border-gray-600 flex items-center justify-center text-3xl text-white">♚</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-8 text-gray-300 mb-4">
          <div className="text-lg font-bold text-primary-400">
            {isMyTurn ? 'Your Turn' : 'Opponent\'s Turn'}
          </div>
        </div>
      </div>

      {/* Chess Board Image */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-xl"></div>
          <div className="relative bg-gray-900 p-4 rounded-xl border border-white/10 flex items-center justify-center">
            <img
              src="/chessBoard.png.jpg"
              alt="Chess Board"
              className="w-96 h-96 object-contain rounded-lg shadow-2xl border-4 border-amber-800"
              style={{ maxWidth: '384px', maxHeight: '384px' }}
            />
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
            <div className="text-2xl font-bold text-secondary-400">1/2</div>
            <div className="text-sm text-gray-400">Players</div>
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
