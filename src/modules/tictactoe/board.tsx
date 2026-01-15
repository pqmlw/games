import React, { useState, useEffect } from "react";

type Props = {
  board: string[];
  onCellClick: (index: number) => void;
  xMoves: number[];
  oMoves: number[];
};

const Board: React.FC<Props> = ({ board, onCellClick, xMoves, oMoves }) => {
  const [fadeOutCells, setFadeOutCells] = useState<Set<number>>(new Set());
  const [prevBoard, setPrevBoard] = useState<string[]>(board);

  useEffect(() => {
    // Detect cells that should fade out (cells that had content but now don't)
    const newFadeOutCells = new Set<number>();

    prevBoard.forEach((prevCell, index) => {
      if (prevCell !== "" && board[index] === "") {
        newFadeOutCells.add(index);
        // Remove from fade out after animation completes
        const timer = setTimeout(() => {
          setFadeOutCells((prev) => {
            const updated = new Set(prev);
            updated.delete(index);
            return updated;
          });
        }, 400); // Match animation duration

        return () => clearTimeout(timer);
      }
    });

    if (newFadeOutCells.size > 0) {
      setFadeOutCells(newFadeOutCells);
    }

    setPrevBoard(board);
  }, [board, prevBoard]);

  return (
    <div className="board w-full max-w-md mt-12 flex justify-center items-center mx-auto flex-wrap gap-x-6 gap-y-6">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`boxes cursor-pointer bg-green-700/10 rounded-2xl w-32 h-32 flex items-center justify-center transform transition-transform duration-200 hover:scale-105 active:scale-95 border-2 border-green-800 ${
            fadeOutCells.has(index) ? "animate-fade-out" : ""
          }`}
          onClick={() => onCellClick(index)}
        >
          {/* Icon with small move-order number as subscript (e.g. X₁) */}
          {cell === "X" &&
            // If move-order exists, show single label like "X₁"; otherwise show icon
            (xMoves && xMoves.indexOf(index) !== -1 ? (
              <span className="text-4xl font-extrabold text-green-900 animate-fade-in">
                X
                <sub className="text-xl align-baseline">
                  {xMoves.indexOf(index) + 1}
                </sub>
              </span>
            ) : (
              <svg
                className="w-12 h-12 text-green-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ))}
          {cell === "O" &&
            (oMoves && oMoves.indexOf(index) !== -1 ? (
              <span className="text-4xl font-extrabold text-yellow-700 animate-fade-in">
                O
                <sub className="text-xl align-baseline">
                  {oMoves.indexOf(index) + 1}
                </sub>
              </span>
            ) : (
              <svg
                className="w-12 h-12 text-yellow-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" />
              </svg>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
