import React, { useState, useEffect } from 'react';
import { MyChessGame_backend } from 'declarations/MyChessGame_backend';

export default function JoinGame({ onBack, onJoin }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesList = await MyChessGame_backend.listGames();
        const formattedGames = gamesList.map(game => ({
          ...game,
          id: Number(game.id),
          duration: Number(game.duration),
          betAmount: Number(game.betAmount),
        }));
        setGames(formattedGames);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">♕ Available Games ♕</h2>
          <p className="text-gray-400">Finding epic battles...</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-lg">Loading Games...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">♕ Available Games ♕</h2>
        <p className="text-gray-400">Join an epic chess battle</p>
      </div>

      {games.length === 0 ? (
        <div className="text-center space-y-4">
          <div className="text-6xl opacity-20">♔</div>
          <p className="text-gray-400 text-lg">No games available</p>
          <p className="text-gray-500">Create a new game to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {games.map(game => (
            <div key={game.id} className={`game-container p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${selectedGame === game.id ? 'ring-2 ring-primary-500 glow-effect' : ''}`} onClick={() => setSelectedGame(game.id)}>
              <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">♔</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{game.name}</h3>
                      <span className="px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full">1/2 Players</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{game.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>${game.betAmount}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">Created by {game.createdBy}</div>

                  {/* Progress bars */}
                  <div className="space-y-1">
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1 rounded-full w-1/2"></div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-gradient-to-r from-secondary-500 to-accent-500 h-1 rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); onJoin(game.id); }}
                  className={`btn px-6 py-3 ml-4 ${selectedGame === game.id ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  Join Battle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={onBack} className="btn w-full bg-gray-700 hover:bg-gray-600 text-lg py-4 mt-6">
        ← Back to Menu
      </button>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 opacity-10 animate-float-slow">♕</div>
      <div className="absolute top-4 right-4 opacity-10 animate-float-slower">♖</div>
      <div className="absolute bottom-4 left-4 opacity-10 animate-float">♗</div>
      <div className="absolute bottom-4 right-4 opacity-10 animate-float-slow">♘</div>
    </div>
  );
}
