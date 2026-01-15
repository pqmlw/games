export type Snapshot = { board: string[]; xQueue: number[]; oQueue: number[] };

export const simulatePlacement = (
  boardState: string[],
  xQueue: number[],
  oQueue: number[],
  player: "X" | "O",
  index: number
): Snapshot => {
  const nb = [...boardState];
  const nx = [...xQueue];
  const no = [...oQueue];

  nb[index] = player;
  if (player === "X") {
    nx.push(index);
    if (nx.length > 3) {
      const removed = nx.shift() as number;
      if (nb[removed] === "X") nb[removed] = "";
    }
  } else {
    no.push(index);
    if (no.length > 3) {
      const removed = no.shift() as number;
      if (nb[removed] === "O") nb[removed] = "";
    }
  }

  return { board: nb, xQueue: nx, oQueue: no };
};

export function checkWinner(board: string[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export const chooseBotMove = (
  boardState: string[],
  xQueue: number[],
  oQueue: number[]
) => {
  const empties = boardState.map((v, i) => (v === "" ? i : -1)).filter((i) => i !== -1) as number[];

  // win if possible
  for (const idx of empties) {
    const snap = simulatePlacement(boardState, xQueue, oQueue, "O", idx);
    if (checkWinner(snap.board) === "O") return idx;
  }

  // block player
  for (const idx of empties) {
    const snap = simulatePlacement(boardState, xQueue, oQueue, "X", idx);
    if (checkWinner(snap.board) === "X") return idx;
  }

  if (boardState[4] === "") return 4;

  const corners = [0, 2, 6, 8];
  for (const c of corners) {
    const opposite = 8 - c;
    if (boardState[c] === "X" && boardState[opposite] === "") return opposite;
  }

  for (const c of corners) if (boardState[c] === "") return c;

  let best = -1;
  let bestScore = -Infinity;
  for (const idx of empties) {
    const snap = simulatePlacement(boardState, xQueue, oQueue, "O", idx);
    let score = 0;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      const vals = [snap.board[a], snap.board[b], snap.board[c]];
      const oCount = vals.filter((v) => v === "O").length;
      const xCount = vals.filter((v) => v === "X").length;
      if (oCount === 2 && xCount === 0) score += 5;
      if (oCount === 1 && xCount === 0) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = idx;
    }
  }

  if (best !== -1) return best;

  if (empties.length === 0) return -1;
  return empties[0];
};
