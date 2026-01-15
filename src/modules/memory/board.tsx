import React, { useState, useCallback, useEffect } from "react";
import { GameCard } from "@src/typings/cards";
import { Card } from "./card";

type BoardProps = {
  cards: GameCard[];
  onGameStateChange?: (
    matched: number,
    gameWon: boolean,
    updatedCards?: GameCard[]
  ) => void;
  onFirstFlip?: () => void;
  isPaused?: boolean;
};

export function Board({
  cards: initialCards,
  onGameStateChange,
  onFirstFlip,
  isPaused = false,
}: BoardProps) {
  const [cards, setCards] = useState<GameCard[]>(initialCards);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(() => {
    return initialCards.filter((card) => card.isMatched).length / 2;
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const isGameWon = matchedPairs === cards.length / 2;

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsDisabled(true);
      const timer = setTimeout(() => {
        const [idx1, idx2] = flippedIndices;
        if (cards[idx1].value === cards[idx2].value) {
          setCards((prevCards) =>
            prevCards.map((card, idx) =>
              idx === idx1 || idx === idx2 ? { ...card, isMatched: true } : card
            )
          );
          setMatchedPairs((prev) => prev + 1);
        }
        setFlippedIndices([]);
        setIsDisabled(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [flippedIndices, cards]);

  useEffect(() => {
    onGameStateChange?.(matchedPairs, isGameWon, cards);
  }, [matchedPairs, isGameWon, onGameStateChange, cards]);

  const handleFlip = useCallback(
    (index: number) => {
      if (isPaused) return;
      if (flippedIndices.includes(index)) return;

      if (flippedIndices.length === 0 && onFirstFlip) {
        onFirstFlip();
      }

      setFlippedIndices([...flippedIndices, index]);
    },
    [flippedIndices, onFirstFlip, isPaused]
  );

  return (
    <div className="flex justify-center pt-10 pb-10">
      <div
        className={`grid grid-cols-4 gap-4 p-8 bg-gradient-to-b from-cyan-50 to-emerald-100 rounded-lg shadow-xl ${
          isPaused ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            isFlipped={flippedIndices.includes(index)}
            isDisabled={isDisabled}
            onFlip={() => handleFlip(index)}
          />
        ))}
      </div>
    </div>
  );
}
