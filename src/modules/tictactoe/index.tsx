import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import Board from "./Board";
import { simulatePlacement, chooseBotMove, checkWinner } from "./utils";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));

  const [xMoves, setXMoves] = useState<number[]>([]);
  const [oMoves, setOMoves] = useState<number[]>([]);

  const [xTurn, setXTurn] = useState<boolean>(true);

  const [winner, setWinner] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [started, setStarted] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const formatTime = (t: number) => {
    const mm = Math.floor(Math.max(0, t) / 60)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor(Math.max(0, t) % 60)
      .toString()
      .padStart(2, "0");
    return `${mm}:${ss}`;
  };

  // Normalize winner label for display: accept 'X'/'O' or textual 'PLAYER'/'BOT'
  const isPlayerWinner = (w: string | null) => {
    if (!w) return false;
    const up = w.toString().toUpperCase();
    return up === "X" || up.includes("PLAYER");
  };

  const winnerLabel = (w: string | null) => {
    if (!w) return null;
    return isPlayerWinner(w) ? "Player" : "Bot";
  };

  /**
   * Handles click on a board cell.
   * @param index - Index of the clicked cell.
   */
  const handleClick = (index: number) => {
    if (!xTurn || winner || board[index] !== "" || isBotThinking) return;
    if (!started) setStarted(true);
    placeMove("X", index);
  };

  // `simulatePlacement` moved to ./utils.ts

  const placeMove = (player: "X" | "O", index: number) => {
    if (winner) return;

    const snapshot = simulatePlacement(board, xMoves, oMoves, player, index);

    setBoard(snapshot.board);
    setXMoves(snapshot.xQueue);
    setOMoves(snapshot.oQueue);

    const win = checkWinner(snapshot.board);
    if (win) {
      setWinner(win);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setXTurn(player === "O");

    if (player === "X") {
      setIsBotThinking(true);
      setTimeout(() => {
        if (!winner && timeLeft > 0)
          runBotMove(snapshot.board, snapshot.xQueue, snapshot.oQueue);
        else setIsBotThinking(false);
      }, 300);
    }
  };

  // `chooseBotMove` moved to ./utils.ts

  const runBotMove = (
    boardState?: string[],
    xQueue?: number[],
    oQueue?: number[]
  ) => {
    const b = boardState ?? board;
    const xq = xQueue ?? xMoves;
    const oq = oQueue ?? oMoves;

    if (winner) return;
    const empties = b
      .map((v, i) => (v === "" ? i : -1))
      .filter((i) => i !== -1) as number[];
    if (empties.length === 0) {
      setIsBotThinking(false);
      return;
    }
    setIsBotThinking(true);
    setTimeout(() => {
      if (winner) {
        setIsBotThinking(false);
        return;
      }
      const choice = chooseBotMove(b, xq, oq);
      if (choice === -1 || choice === undefined) {
        setIsBotThinking(false);
        return;
      }
      const snap = simulatePlacement(b, xq, oq, "O", choice);
      setBoard(snap.board);
      setOMoves(snap.oQueue);
      setXMoves(snap.xQueue);
      const win = checkWinner(snap.board);
      if (win) {
        setWinner(win);
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        setXTurn(true);
      }
      setIsBotThinking(false);
    }, 400);
  };

  /**
   * Checks for a winner on the board.
   * @param board - Current board state
   * @returns "X", "O", or null if no winner
   */
  // `checkWinner` moved to ./utils.ts

  /**
   * Resets the game state to initial values.
   */
  const reset = () => {
    setBoard(Array(9).fill(""));
    setXMoves([]);
    setOMoves([]);
    setXTurn(true);
    setWinner(null);
    setTimeLeft(90);
    setStarted(false);
    setIsBotThinking(false);
    setShowConfetti(false);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (started && !winner && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [started, winner]);
  useEffect(() => {
    if (timeLeft <= 0 && !winner) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      const t = window.setTimeout(() => setWinner("O"), 0);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [timeLeft, winner]);

  // Trigger confetti when the Player wins (X)
  useEffect(() => {
    if (winner && isPlayerWinner(winner)) {
      setShowConfetti(true);
    }
  }, [winner]);

  return (
    <div className="px-4 flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      {showConfetti && <Confetti active={showConfetti} />}
      {/* Game title and winner display */}
      <h1 className="title text-3xl md:text-5xl font-extrabold flex items-center justify-center gap-4 text-center mb-4">
        {winner ? (
          <span className="text-green-900">
            <span
              className={
                isPlayerWinner(winner) ? "text-[#ffb700]" : "text-primary"
              }
            >
              {winnerLabel(winner)}
            </span>{" "}
            Win
          </span>
        ) : (
          <span className="text-green-900">Tic Tac Toe</span>
        )}
      </h1>

      {/* Status bar: timer and turn */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="text-lg font-medium  text-green-900">
          Time:{" "}
          <span className="text-accent text-green-900">
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="text-lg font-medium  text-green-900">
          Status:{" "}
          {winner
            ? `${winnerLabel(winner)} Win`
            : timeLeft <= 0
            ? "Time up"
            : xTurn
            ? "Your turn"
            : "Bot turn"}
        </div>
        {isBotThinking && <div className="text-lg">Bot thinking...</div>}
      </div>

      {/* Game board */}
      {/* Board component handles rendering cells */}
      <Board
        board={board}
        onCellClick={handleClick}
        xMoves={xMoves}
        oMoves={oMoves}
      />

      {/* Reset button */}
      <div className="w-full flex justify-center mt-12">
        <button
          className="reset cursor-pointer bg-yellow-500 w-48 h-16 rounded-2xl text-lg font-semibold text-green-900 border-2 border-green-900 hover:border-yellow-400 transition-colors duration-500"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
/**
 * Exports the TicTacToe component as default.
 */
