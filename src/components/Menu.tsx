import { useState } from "react";

interface MenuProps {
  onStart: (mark: "X" | "O", mode: "cpu" | "human") => void;
}

function Menu({ onStart }: MenuProps) {
  const [mark, setMark] = useState<"X" | "O">("X");
  return (
    <div className="flex flex-col w-full items-center gap-8 max-w-81">
      <img className="w-17.5" src="/images/logo.svg" alt="logo XO" />
      <section className="game-box-general flex flex-col items-center text-center rounded-2xl bg-slate-800 text-slate-300 p-6 gap-6 w-full">
        <h1 className="text-preset-4" id="title">
          PICK PLAYER 1’S MARK
        </h1>
        <fieldset
          className="grid grid-cols-2 place-items-center bg-slate-900 w-full p-2 rounded-xl"
          aria-labelledby="title"
        >
          <input
            className="sr-only "
            type="radio"
            name="player"
            id="X"
            value="X"
            checked={mark === "X"}
            onChange={() => {
              setMark("X");
            }}
          />
          <label
            className="flex items-center justify-center  col-start-1 w-full  rounded-lg p-2"
            htmlFor="X"
          >
            <svg
              className="w-7.5 h-7.5 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </label>
          <input
            className="sr-only"
            type="radio"
            name="player"
            id="O"
            value="O"
            checked={mark === "O"}
            onChange={() => {
              setMark("O");
            }}
          />
          <label
            className="flex items-center justify-center  col-start-2 w-full  rounded-lg p-2"
            htmlFor="O"
          >
            <svg
              className="w-7.5 h-7.5"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill="currentColor"
              />
            </svg>
          </label>
        </fieldset>
        <h2 className="text-preset-5">REMEMBER : X GOES FIRST</h2>
      </section>
      <section className="flex flex-col gap-4">
        <button
          onClick={() => {
            onStart(mark, "cpu");
          }}
          className="button-primary hover:button-primary-hover w-full"
        >
          NEW GAME (VS CPU)
        </button>
        <button
          onClick={() => {
            onStart(mark, "human");
          }}
          className="button-secondary hover:button-secondary-hover w-full"
        >
          NEW GAME (VS PLAYER)
        </button>
      </section>
    </div>
  );
}

export default Menu;
