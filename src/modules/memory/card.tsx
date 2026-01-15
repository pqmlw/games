import React, { useCallback } from "react";
import { GameCard } from "@src/typings/cards";

type CardProps = {
  card: GameCard;
  isFlipped: boolean;
  isDisabled: boolean;
  onFlip: () => void;
};

export function Card({ card, isFlipped, isDisabled, onFlip }: CardProps) {
  const handleClick = useCallback(() => {
    if (!isDisabled && !isFlipped && !card.isMatched) {
      onFlip();
    }
  }, [onFlip, isDisabled, isFlipped, card.isMatched]);

  const isCardFlipped = card.isMatched || isFlipped;

  return (
    <button
      disabled={isCardFlipped || isDisabled}
      onClick={handleClick}
      className="relative h-30 w-30 [perspective:1000px]"
    >
      <div
        className={`relative h-full w-full rounded-lg transition-transform duration-700 [transform-style:preserve-3d]
                ${
                  isCardFlipped
                    ? "[transform:rotateY(180deg)]"
                    : "hover:scale-105"
                } border-1 border-green-950 shadow-lg
    `}
      >
        <div className="absolute inset-0 flex justify-center items-center rounded-lg bg-linear-to-r from-cyan-500/50 to-emerald-400/50 text-4xl font-bold text-white select-none [backface-visibility:hidden]">
          ?
        </div>
        <div className="absolute inset-0 rounded-lg bg-black [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <img
            src={card.image}
            alt={String(card.value)}
            className="h-full w-full object-cover rounded-md"
          />
        </div>
      </div>
    </button>
  );
}
