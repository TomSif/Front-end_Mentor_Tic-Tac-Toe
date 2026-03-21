import { useState } from "react";

interface CellProps {
  onClick: () => void;
  value: "X" | "O" | null;
  playerTurn: "X" | "O";
}

function Cell({ value, playerTurn, onClick }: CellProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const playerTurnLow = playerTurn.toLocaleLowerCase();
  return (
    <button
      className="w-full flex items-center justify-center game-cell p-6  aspect-square  relative"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={value !== null}
    >
      {isHovered === true && value === null ? (
        <img
          className="w-10 h-10 transform opacity-100 transition-opacity duration-300 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={`/images/icon-${playerTurnLow}-outline.svg`}
          alt=""
        />
      ) : (
        <img
          className="w-10 h-10 transform opacity-0 transition-opacity duration-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={`/images/icon-${playerTurnLow}-outline.svg`}
          alt=""
        />
      )}
      {value === "X" ? (
        <img className="w-10 h-10" src="/images/icon-x.svg" alt="" />
      ) : value === "O" ? (
        <img className="w-10 h-10" src="/images/icon-o.svg" alt="" />
      ) : (
        ""
      )}
    </button>
  );
}
export default Cell;
