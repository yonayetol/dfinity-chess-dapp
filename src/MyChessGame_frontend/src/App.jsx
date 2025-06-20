import React, { useState } from 'react';
import MakeGame from './MakeGame.jsx';
import JoinGame from './JoinGame.jsx';
import ChessBoard from './ChessBoard.jsx';

export default function App() {
  const [mode, setMode] = useState('home');
  const [fen, setFen] = useState('start');
  const [gameId, setGameId] = useState(null);

  const handleJoinGame = (id) => {
    setGameId(id);
    setMode('playGame');
  };

  const handleGameCreated = () => {
    setMode('joinGame');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full flex justify-center">
        {mode === 'home' && (
          <div className="game-container space-y-8 w-full max-w-4xl relative overflow-hidden">
            {/* Animated chess pieces in background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-10 left-10 animate-float-slow">♔</div>
              <div className="absolute top-20 right-20 animate-float-slower">♕</div>
              <div className="absolute bottom-20 left-1/4 animate-float">♖</div>
              <div className="absolute bottom-10 right-1/4 animate-float-slow">♗</div>
              <div className="absolute top-1/3 left-1/3 animate-float-slower">♘</div>
              <div className="absolute bottom-1/3 right-1/3 animate-float">♙</div>
              <div className="absolute top-1/2 left-1/6 animate-float-slow">♚</div>
              <div className="absolute bottom-1/2 right-1/6 animate-float-slower">♛</div>
            </div>

            {/* Main content */}
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h1 className="game-title text-5xl mb-4 float-effect">♔ Chess Master ♔</h1>
                <p className="text-gray-300 text-lg">Challenge players worldwide in epic chess battles</p>
              </div>

              {/* Horizontal Game Options */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-6 max-w-4xl w-full">
                  <div className="game-container p-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex-1 text-center"
                    onClick={() => setMode('makeGame')}>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center glow-effect">
                        <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Create Game</h3>
                      <p className="text-gray-400">Start a new game and invite players</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>

                  <div className="game-container p-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex-1 text-center"
                    onClick={() => setMode('joinGame')}>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-secondary-500/30 to-secondary-600/30 rounded-full flex items-center justify-center glow-effect">
                        <svg className="w-10 h-10 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Join Game</h3>
                      <p className="text-gray-400">Find and join existing games</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats section */}
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-6 text-center max-w-4xl w-full">
                  <div className="game-container p-6 hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-primary-400 mb-2">1,234</div>
                    <div className="text-sm text-gray-400">Active Players</div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div className="bg-primary-500 h-1 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="game-container p-6 hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-secondary-400 mb-2">567</div>
                    <div className="text-sm text-gray-400">Games Today</div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div className="bg-secondary-500 h-1 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="game-container p-6 hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-accent-400 mb-2">89</div>
                    <div className="text-sm text-gray-400">Tournaments</div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div className="bg-accent-500 h-1 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center mt-8">
                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
                    Quick Play
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
                    Tournament
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {mode === 'makeGame' && (
          <div className="game-container w-full max-w-2xl">
            <MakeGame onBack={() => setMode('home')} onGameCreated={handleGameCreated} />
          </div>
        )}
        {mode === 'joinGame' && (
          <div className="game-container w-full max-w-2xl">
            <JoinGame onBack={() => setMode('home')} onJoin={handleJoinGame} />
          </div>
        )}
        {mode === 'playGame' && (
          <div className="game-container w-full max-w-4xl">
            <ChessBoard
              fen={fen}
              onMove={() => { }}
              isMyTurn={true}
              orientation={'white'}
            />
          </div>
        )}
      </div>
    </div>
  );
}
