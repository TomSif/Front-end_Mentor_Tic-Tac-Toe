interface ModalProps {
  winner: "X" | "O" | "Tie" | null;
  onQuit: () => void;
  onRestart: () => void;
}

function Modal({ winner, onQuit, onRestart }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black/50  z-20">
      <div className="absolute z-30 flex flex-col game-cell rounded-none top-[33%] left-0 items-center justify-center w-full h-screen max-h-57 gap-7.5">
        <div className="flex flex-col gap-6  text-preset-2 items-center">
          {winner === "X" ? (
            <p className="text-preset-5-medium text-slate-300">PLAYER 1 WINS</p>
          ) : winner === "O" ? (
            <p className="text-preset-5-medium text-slate-300">PLAYER 2 WINS</p>
          ) : (
            ""
          )}
          {winner === "X" ? (
            <h1 className="flex gap-6 justify-between text-teal-400">
              <img className="w-7 " src="/images/icon-x.svg" />
              TAKES THE ROUND
            </h1>
          ) : winner === "O" ? (
            <h1 className="flex gap-6 justify-between text-amber-400 ">
              <img className="w-7 " src="/images/icon-o.svg" />
              TAKES THE ROUND
            </h1>
          ) : (
            <h1 className="flex justify-between text-slate-300">ROUND TIED</h1>
          )}
        </div>
        <div className="flex gap-4 w-full items-center justify-center">
          <button
            onClick={() => onQuit()}
            className="button-quaternary hover:button-quaternary-hover w-auto text-preset-4 hover:text-preset-4 h-13"
          >
            QUIT
          </button>
          <button
            onClick={() => onRestart()}
            className="button-primary hover:button-primary-hover w-auto text-preset-4 hover:text-preset-4 h-13 shadow-[inset_0_-4px_0_0_rgba(204,139,19,1)] hover:shadow-[inset_0_-4px_0_0_rgba(204,139,19,1)] py-0 hover:py-0"
          >
            NEXT ROUND
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
