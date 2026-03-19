interface CellProps {
  onClick: () => void;
  value: "X" | "O" | null;
}

function Cell({ value, onClick }: CellProps) {
  return (
    <button
      className="w-full flex items-center justify-center game-cell p-6  aspect-square "
      onClick={onClick}
      disabled={value !== null}
    >
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
