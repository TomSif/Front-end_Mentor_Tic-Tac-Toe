interface ModalProps {
  onCancel: () => void;
  onRestart: () => void;
}

function RestartModal({ onCancel, onRestart }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black/50  z-20">
      <div className="absolute z-30 flex flex-col game-cell rounded-none top-[33%] left-0 items-center justify-center w-full h-screen max-h-57 gap-7.5 opacity-100">
        <div className="flex flex-col gap-6  text-preset-2 lg:text-preset-1    w-auto items-center ">
          <h1 className="flex justify-between text-slate-300">
            RESTART THE GAME
          </h1>
        </div>
        <div className="flex gap-4 w-full items-center justify-center">
          <button
            onClick={() => onCancel()}
            className="button-quaternary hover:button-quaternary-hover w-auto text-preset-4 hover:text-preset-4 h-13"
          >
            NO, CANCEL
          </button>
          <button
            onClick={() => onRestart()}
            className="button-primary hover:button-primary-hover w-auto text-preset-4 hover:text-preset-4 h-13 shadow-[inset_0_-4px_0_0_rgba(204,139,19,1)] hover:shadow-[inset_0_-4px_0_0_rgba(204,139,19,1)] py-0 hover:py-0"
          >
            YES, RESTART
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestartModal;
