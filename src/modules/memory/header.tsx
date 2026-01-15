import React from "react";

type HeaderProps = {
  matchedPairs: number;
  totalPairs: number;
  timeLeft?: number;
  isPaused?: boolean;
  onPauseToggle?: () => void;
};

export function Header({
  matchedPairs,
  totalPairs,
  timeLeft,
  isPaused = false,
  onPauseToggle,
}: HeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-linear-to-b from-cyan-500/50 to-emerald-400/50 text-white py-8 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Memory Matching Game
        </h1>

        <div className="flex justify-center gap-8 items-end">
          <div className="rounded-lg p-4">
            <p className="text-sm font-semibold text-white text-center">
              Matched Pairs
            </p>
            <p className="text-2xl font-bold">
              {matchedPairs}/{totalPairs}
            </p>
          </div>

          <div className={`rounded-lg p-4`}>
            <p className="text-sm font-semibold text-white text-center">
              Time Left
            </p>
            <p className="text-2xl font-bold">
              {timeLeft !== undefined ? formatTime(timeLeft) : "1:30"}
            </p>
          </div>

          {onPauseToggle && (
            <button
              onClick={onPauseToggle}
              className="rounded-lg px-6 py-3 bg-white text-cyan-600 font-semibold hover:bg-gray-100 transition-colors"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
