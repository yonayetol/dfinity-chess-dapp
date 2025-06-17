import React, { useState } from 'react';

export default function JoinGame({ onBack, onJoin }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const mockGames = [
    { id: 1, name: 'Game 1', duration: 5, betAmount: 10, players: 1, createdBy: 'Player1' },
    { id: 2, name: 'Game 2', duration: 10, betAmount: 20, players: 2, createdBy: 'Player2' },
    { id: 3, name: 'Game 3', duration: 15, betAmount: 30, players: 1, createdBy: 'Player3' },
  ];

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Available Games</h2>

      <div className="grid gap-4">
        {mockGames.map(game => (
          <div
            key={game.id}
            className={`game-container p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${selectedGame === game.id ? 'ring-2 ring-primary-500' : ''
              }`}
            onClick={() => setSelectedGame(game.id)}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-bold text-white">{game.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full">
                    {game.players}/2 Players
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{game.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>${game.betAmount}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  Created by {game.createdBy}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onJoin();
                }}
                className={`btn px-6 ${selectedGame === game.id
                    ? 'bg-primary-500 hover:bg-primary-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                  }`}
              >
                Join Game
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="btn w-full bg-gray-700 hover:bg-gray-600 mt-6"
      >
        Back
      </button>
    </div>
  );
}
