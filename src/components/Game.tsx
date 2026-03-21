import { useState } from "react";
import Cell from "./Cell";
import Modal from "./Modal";
import RestartModal from "./RestartModal";

interface GameProps {
  onQuit: () => void;
  gameMode: "cpu" | "human";
  firstPlayerChoice: "X" | "O";
}
const WIN_COMBS = [
  [0, 1, 2], //1st h
  [3, 4, 5], //2nd h
  [6, 7, 8], //3rd h
  [0, 3, 6], //1st v
  [1, 4, 7], //2nd v
  [2, 5, 8], //3rd v
  [0, 4, 8], //1st d
  [2, 4, 6], //2nd d
];

function getCpuMove(board: ("X" | "O" | null)[], cpuMark: "X" | "O") {
  const humanMark = cpuMark === "X" ? "O" : "X";
  const CpuWinner = WIN_COMBS.find(
    ([a, b, c]) =>
      (board[a] === cpuMark && board[b] === cpuMark && board[c] === null) ||
      (board[a] === cpuMark && board[b] === null && board[c] === cpuMark) ||
      (board[a] === null && board[b] === cpuMark && board[c] === cpuMark),
  );
  if (CpuWinner) {
    const [a, b, c] = CpuWinner;

    if (board[a] === null) return a;
    if (board[b] === null) return b;
    if (board[c] === null) return c;
  }

  const humanWinner = WIN_COMBS.find(
    ([a, b, c]) =>
      (board[a] === humanMark && board[b] === humanMark && board[c] === null) ||
      (board[a] === humanMark && board[b] === null && board[c] === humanMark) ||
      (board[a] === null && board[b] === humanMark && board[c] === humanMark),
  );

  if (humanWinner) {
    const [d, f, g] = humanWinner;

    if (board[d] === null) return d;
    if (board[f] === null) return f;
    if (board[g] === null) return g;
  } else {
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomPlay = emptyCells[randomIndex];
    return randomPlay;
  }
}

function Game({ onQuit, gameMode, firstPlayerChoice }: GameProps) {
  const [playerTurn, setPlayerTurn] = useState<"X" | "O">(firstPlayerChoice);
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreT, setScoreT] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [winnerIs, setWinnerIs] = useState<"X" | "O" | "Tie" | null>(null);
  const [isRestartPressed, setIsRestartPressed] = useState<boolean>(false);

  function checkWinner(board: ("X" | "O" | null)[]) {
    const winner = WIN_COMBS.find(
      ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c],
    );
    if (winner) {
      return board[winner[0]];
    } else {
      return null;
    }
  }

  function score(newWinner: "X" | "O" | null) {
    if (newWinner === "X") {
      setScoreX((prev) => prev + 1);
      setGameIsOver(true);
    } else if (newWinner === "O") {
      setScoreO((prev) => prev + 1);
      setGameIsOver(true);
    } else {
      return null;
    }
  }

  function openModal(newWinner: "X" | "O" | "Tie" | null) {
    setWinnerIs(newWinner);
  }

  function onRestart() {
    setGameIsOver(false);
    setBoard(Array(9).fill(null));
    setWinnerIs(null);
    setIsRestartPressed(false);
  }

  function onCancel() {
    setIsRestartPressed(false);
  }

  return (
    <div className="w-full flex flex-col items-center relative z-0">
      {isRestartPressed !== false && (
        <RestartModal onRestart={onRestart} onCancel={onCancel} />
      )}
      {winnerIs !== null && (
        <Modal winner={winnerIs} onRestart={onRestart} onQuit={onQuit} />
      )}
      <div className=" w-full flex flex-col items-center md:max-w-115 gap-5 relative z-10">
        <section className="grid grid-cols-3 gap-5 justify-between items-center h-10 w-full mb-11 md:mb-0">
          <img
            className="w-17.5 col-start-1 justify-self-start"
            src="/images/logo.svg"
            alt="logo XO"
          />
          <div
            aria-description={`player turn is ${playerTurn}`}
            aria-live="polite"
            className="col-start-2 justify-self-center w-full min-h-full flex text-slate-300 pt-2 pb-2 gap-3 text-preset-4 game-cell items-center justify-center rounded-sm shadow-[inset_0_-4px_0_0_rgba(16,33,42,1)]"
          >
            {playerTurn === "X" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                  fill="currentColor"
                />
              </svg>
            )}
            <span>TURN</span>
          </div>
          <button
            aria-label="restart button"
            onClick={() => setIsRestartPressed(true)}
            className="col-start-3 justify-self-end flex items-center justify-center button-style-4 hover:button-style-4-hover w-10 h-10 rounded-md"
          >
            <img src="/images/icon-restart.svg" alt="" />
          </button>
        </section>
        <section className="w-full flex flex-col items-center" id="game-grid">
          <ul className="w-full  grid grid-cols-3 gap-5 grid-rows-3">
            {board.map((cell, index) => {
              return (
                <li className="aspect-square" key={index}>
                  <Cell
                    value={cell}
                    playerTurn={playerTurn}
                    onClick={() => {
                      if (gameIsOver) return;
                      const newBoard = [...board];
                      newBoard[index] = playerTurn;
                      setBoard(newBoard);
                      const newWinner = checkWinner(newBoard);
                      score(newWinner);
                      if (newWinner) {
                        openModal(newWinner);
                        return;
                      }
                      if (
                        newBoard.every((cell) => cell !== null) &&
                        newWinner === null
                      ) {
                        setScoreT((prev) => prev + 1);
                        openModal("Tie");
                        return;
                      } else {
                        setPlayerTurn((prev) => (prev === "X" ? "O" : "X"));
                        if (gameMode == "cpu") {
                          const cpuMark = firstPlayerChoice === "X" ? "O" : "X";
                          setTimeout(() => {
                            const cpuPlay = getCpuMove(newBoard, cpuMark);
                            if (cpuPlay !== undefined) {
                              const lastBoard = [...newBoard];
                              lastBoard[cpuPlay] = cpuMark;
                              setBoard(lastBoard);
                              setPlayerTurn(firstPlayerChoice);
                              const cpuWinner = checkWinner(lastBoard);
                              score(cpuWinner);
                              if (cpuWinner) {
                                openModal(cpuWinner);
                              }
                            }
                          }, 300);
                        }
                      }
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <section className="grid grid-cols-3 gap-5 justify-between items-center w-full h-16">
          <div className="button-secondary w-full h-16 flex flex-col items-center justify-center text-slate-900 shadow-none p-0">
            <span className="text-preset-6-medium">
              X{" "}
              {gameMode === "human"
                ? firstPlayerChoice === "X"
                  ? "(P1)"
                  : "(P2)"
                : firstPlayerChoice === "X"
                  ? "YOU"
                  : "CPU"}
            </span>
            <strong className="text-preset-3">{scoreX}</strong>
          </div>
          <div className="button-quaternary w-full h-16 flex flex-col items-center justify-center text-slate-900 shadow-none p-0">
            <span className="text-preset-6-medium">TIES</span>
            <strong className="text-preset-3">{scoreT}</strong>
          </div>
          <div className="button-primary w-full h-16 flex flex-col items-center justify-center text-slate-900 shadow-none p-0">
            <span className="text-preset-6-medium">
              O{" "}
              {gameMode === "human"
                ? firstPlayerChoice === "O"
                  ? "(P1)"
                  : "(P2)"
                : firstPlayerChoice === "O"
                  ? "YOU"
                  : "CPU"}
            </span>
            <strong className="text-preset-3">{scoreO}</strong>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Game;
