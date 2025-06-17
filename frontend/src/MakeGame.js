import React, { useState } from 'react';

export default function MakeGame({ onBack }) {
  const [duration, setDuration] = useState(5);
  const [betAmount, setBetAmount] = useState(0);

  const handleCreateGame = () => {
    // Logic to create a game
    alert(`Game created with duration ${duration} minutes and bet amount $${betAmount}`);
    onBack();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Create New Game</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-white text-sm font-medium text-center">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className="input w-full text-center"
            min="1"
            max="60"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-white text-sm font-medium text-center">Bet Amount ($)</label>
          <input
            type="number"
            value={betAmount}
            onChange={e => setBetAmount(e.target.value)}
            className="input w-full text-center"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-3 pt-4">
        <button
          onClick={handleCreateGame}
          className="btn w-full"
        >
          Create Game
        </button>
        <button
          onClick={onBack}
          className="btn w-full bg-gray-700 hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}
