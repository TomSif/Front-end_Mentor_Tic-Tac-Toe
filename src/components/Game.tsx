import { useState } from "react";
import Cell from "./Cell";

interface GameProps {
  onReStart: () => void;
  gameMode: "cpu" | "human";
  firstPlayerChoice: "X" | "O";
}

function Game({ onReStart, gameMode, firstPlayerChoice }: GameProps) {
  const [playerTurn, setPlayerTurn] = useState<"X" | "O">("X");
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreT, setScoreT] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));

  return (
    <div className="p-6 w-full ">
      <section className="grid grid-cols-3 gap-5 justify-between items-center h-10 w-full">
        <img
          className="w-17.5 col-start-1 justify-self-start"
          src="/images/logo.svg"
          alt="logo XO"
        />
        <div
          aria-description={`player turn is ${playerTurn}`}
          aria-live="polite"
          className="col-start-2 justify-self-center w-full flex text-slate-300 pt-2 pb-1 gap-3 text-preset-4 game-box-general items-center justify-center rounded-sm shadow-[inset_0_-4px_0_0_rgba(16,33,42,1)]"
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
          // onClick={() =>}
          className="col-start-3 justify-self-end flex items-center justify-center button-style-4 hover:button-style-4-hover w-10 h-10 rounded-md"
        >
          <img src="/images/icon-restart.svg" alt="" />
        </button>
      </section>
      <section className="" id="game-grid">
        <ul className="grid grid-cols-3 gap-12.5 grid-rows-3">
          {board.map((cell, index) => {
            return (
              <li key={index}>
                <Cell
                  value={cell}
                  onClick={() => {
                    const newBoard = [...board];
                    newBoard[index] = playerTurn;
                    setBoard(newBoard);
                    setPlayerTurn((prev) => (prev === "X" ? "O" : "X"));
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
  );
}

export default Game;
