import { useState, useEffect } from "react";
import {
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
} from "@src/lib/constant/assets";
import { GameCard } from "@src/typings/cards";
import { Board } from "@src/modules/memory/board";
import { Header } from "@src/modules/memory/header";
import { GameEnd } from "@src/modules/memory/gameEnd";
import { createGameCards } from "./randomCard";

const uniqueCards = [
  { value: 1, image: card1 },
  { value: 2, image: card2 },
  { value: 3, image: card3 },
  { value: 4, image: card4 },
  { value: 5, image: card5 },
  { value: 6, image: card6 },
  { value: 7, image: card7 },
  { value: 8, image: card8 },
];

const GAME_TIME = 30;

export default function MemoryModule() {
  const [gameKey, setGameKey] = useState(0);
  const [initialCards, setInitialCards] = useState<GameCard[]>(() => {
    const savedCards = localStorage.getItem("gameCards");
    if (savedCards) {
      return JSON.parse(savedCards);
    }
    return createGameCards(uniqueCards);
  });
  const [matchedPairs, setMatchedPairs] = useState(() => {
    const saved = localStorage.getItem("gameMatchedPairs");
    return saved ? parseInt(saved) : 0;
  });
  const [gameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTime = localStorage.getItem("gameTimeLeft");
    const savedTimestamp = localStorage.getItem("gameTimeStamp");

    if (savedTime && savedTimestamp) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(savedTimestamp)) / 1000
      );
      const remainingTime = Math.max(0, parseInt(savedTime) - elapsed);
      return remainingTime;
    }
    return GAME_TIME;
  });
  const [gameActive, setGameActive] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      localStorage.setItem("gameTimeLeft", timeLeft.toString());
      localStorage.setItem("gameTimeStamp", Date.now().toString());
      localStorage.setItem("gameCards", JSON.stringify(initialCards));
      localStorage.setItem("gameMatchedPairs", matchedPairs.toString());
    } else if (timeLeft === 0 || gameWon) {
      localStorage.removeItem("gameTimeLeft");
      localStorage.removeItem("gameTimeStamp");
      localStorage.removeItem("gameCards");
      localStorage.removeItem("gameMatchedPairs");
    }
  }, [timeLeft, gameActive, gameWon, initialCards, matchedPairs]);

  useEffect(() => {
    if (!gameActive || timeLeft <= 0 || gamePaused) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft, gamePaused]);

  const handleGameStateChange = (
    matched: number,
    won: boolean,
    updatedCards?: GameCard[]
  ) => {
    setMatchedPairs(matched);
    if (updatedCards) {
      setInitialCards(updatedCards);
    }
    if (won) {
      setGameWon(true);
      setGameActive(false);
    }
  };

  const handlePauseToggle = () => {
    setGamePaused((prev) => !prev);
  };

  const resetGame = () => {
    localStorage.removeItem("gameTimeLeft");
    localStorage.removeItem("gameTimeStamp");
    localStorage.removeItem("gameCards");
    localStorage.removeItem("gameMatchedPairs");
    localStorage.setItem("gameActive", "false");

    setInitialCards(createGameCards(uniqueCards));
    setMatchedPairs(0);
    setGameWon(false);
    setTimeLeft(GAME_TIME);
    setGameActive(false);
    setGamePaused(false);
    setGameKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-cyan-50 flex flex-col">
      <Header
        matchedPairs={matchedPairs}
        totalPairs={uniqueCards.length}
        timeLeft={timeLeft}
        isPaused={gamePaused}
        onPauseToggle={
          gameActive && timeLeft > 0 && !gameWon ? handlePauseToggle : undefined
        }
      />

      <div className="flex-1 flex flex-col items-center justify-center py-4 sm:py-8 md:py-12 px-2 sm:px-4">
        {(timeLeft === 0 || gameWon) && (
          <GameEnd isWon={gameWon} timeLeft={timeLeft} onRetry={resetGame} />
        )}

        {timeLeft > 0 && !gameWon && (
          <Board
            key={gameKey}
            cards={initialCards}
            onGameStateChange={handleGameStateChange}
            onFirstFlip={() => setGameActive(true)}
            isPaused={gamePaused}
          />
        )}
      </div>
    </div>
  );
}
