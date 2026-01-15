import React, { useEffect } from "react";
import confetti from "canvas-confetti";

type GameEndProps = {
  isWon: boolean;
  timeLeft?: number;
  onRetry: () => void;
};

export function GameEnd({ isWon, timeLeft, onRetry }: GameEndProps) {
  useEffect(() => {
    if (isWon) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isWon]);
  if (isWon) {
    return (
      <div className="flex text-center justify-center items-center min-h-screen sm:min-h-96 px-4">
        <div className="text-center py-8 sm:py-12 md:py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-3 sm:mb-4 md:mb-6">
            Kelaz kingg
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8">
            Completed with {timeLeft}s remaining!
          </p>
          <button
            onClick={onRetry}
            className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg text-base sm:text-lg md:text-xl"
          >
            New Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex text-center justify-center items-center min-h-screen sm:min-h-96 px-4">
      <div className="flex flex-col items-center text-center py-8 sm:py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-4 sm:mb-6 md:mb-8">
          Time's Up!
        </h2>
        <button
          onClick={onRetry}
          className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg text-base sm:text-lg md:text-xl"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
