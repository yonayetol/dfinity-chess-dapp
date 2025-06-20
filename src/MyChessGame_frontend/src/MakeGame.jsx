import React, { useState } from 'react';
import { MyChessGame_backend } from 'declarations/MyChessGame_backend';

export default function MakeGame({ onBack, onGameCreated }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(5);
  const [betAmount, setBetAmount] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateGame = async () => {
    if (!name) {
      alert('Please enter a game name.');
      return;
    }
    setIsCreating(true);
    try {
      await MyChessGame_backend.createGame(name, BigInt(duration), BigInt(betAmount), "Player1");
      onGameCreated();
    } catch (error) {
      console.error("Failed to create game:", error);
      alert("Failed to create game. See console for details.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">♔ Create New Game ♔</h2>
        <p className="text-gray-400">Set up your chess battle</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="block text-white text-sm font-medium text-center">Game Name</label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input w-full text-center text-lg"
              placeholder="Enter epic game name"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-white text-sm font-medium text-center">Duration (minutes)</label>
          <div className="relative">
            <input
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="input w-full text-center text-lg"
              min="1"
              max="60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-secondary-500 to-accent-500 h-2 rounded-full" style={{ width: `${(duration / 60) * 100}%` }}></div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-white text-sm font-medium text-center">Bet Amount ($)</label>
          <div className="relative">
            <input
              type="number"
              value={betAmount}
              onChange={e => setBetAmount(e.target.value)}
              className="input w-full text-center text-lg"
              min="0"
              step="0.01"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-accent-500 to-primary-500 h-2 rounded-full" style={{ width: `${Math.min((betAmount / 100) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-6">
        <button
          onClick={handleCreateGame}
          className="btn w-full text-lg py-4 glow-effect"
          disabled={isCreating}
        >
          {isCreating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </div>
          ) : (
            '♔ Create Game ♔'
          )}
        </button>
        <button
          onClick={onBack}
          className="btn w-full bg-gray-700 hover:bg-gray-600 text-lg py-4"
        >
          ← Back to Menu
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 opacity-10 animate-float-slow">♔</div>
      <div className="absolute top-4 right-4 opacity-10 animate-float-slower">♕</div>
      <div className="absolute bottom-4 left-4 opacity-10 animate-float">♖</div>
      <div className="absolute bottom-4 right-4 opacity-10 animate-float-slow">♗</div>
    </div>
  );
}
