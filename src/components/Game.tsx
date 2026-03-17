interface GameProps {
  onReStart: () => void;
  gameMode: "cpu" | "human";
  firstPlayerChoice: "X" | "O";
}

function Game({ onReStart, gameMode, firstPlayerChoice }: GameProps) {
  return <div></div>;
}

export default Game;
