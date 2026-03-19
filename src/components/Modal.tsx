interface ModalProps {
  winner: "X" | "O" | "Tie" | null;
  onQuit: () => void;
  onRestart: () => void;
}

function Modal({ winner, onQuit, onRestart }: ModalProps) {
  return (
    <div className="absolute z-20 flex flex-col game-cell rounded-none top-0 left-0 w-full">
      <div className="flex flex-col gap-6  text-preset-2 items-center">
        {winner === "X" ? (
          <p className="text-preset-5-medium text-slate-300">PLAYER 1 WINS</p>
        ) : winner === "O" ? (
          <p className="text-preset-5-medium text-slate-300">PLAYER 2 WINS</p>
        ) : (
          ""
        )}
        {winner === "X" ? (
          <h1 className="flex justify-between text-teal-400">
            <img className="w-7 " src="/images/icon-x.svg" />
            TAKES THE ROUND
          </h1>
        ) : winner === "O" ? (
          <h1 className="flex justify-between text-amber-400 ">
            <img className="w-7 " src="/images/icon-o.svg" />
            TAKES THE ROUND
          </h1>
        ) : (
          <h1 className="flex justify-between text-slate-300">ROUND TIED</h1>
        )}
      </div>
      <div className="flex gap-4 w-full">
        <button
          onClick={() => onQuit()}
          className="button-quaternary hover:button-quaternary-hover w-full text-preset-4 hover:text-preset-4"
        >
          QUIT
        </button>
        <button
          onClick={() => onRestart()}
          className="button-primary hover:button-primary-hover w-full text-preset-4 hover:text-preset-4"
        >
          NEXT ROUND
        </button>
      </div>
    </div>
  );
}

export default Modal;
