import "./index.css";
import Menu from "./components/Menu";
import Game from "./components/Game";
import { useState } from "react";

function App() {
  const [firstPlayerChoice, setFirstPlayerChoice] = useState<"X" | "O">("X");
  const [gameMode, setGameMode] = useState<"cpu" | "human" | null>(null);
  const [currentView, setCurrentView] = useState<"menu" | "game">("menu");

  const views = {
    menu: (
      <Menu
        onStart={(chosenPlayer, chosenMode) => {
          setFirstPlayerChoice(chosenPlayer);
          setGameMode(chosenMode);
          setCurrentView("game");
        }}
      />
    ),
    game: (
      <Game
        firstPlayerChoice={firstPlayerChoice}
        gameMode={gameMode!}
        onReStart={() => {
          setFirstPlayerChoice("X");
          setGameMode(null);
          setCurrentView("menu");
        }}
      />
    ),
  };

  return (
    <>
      <main
        className="bg-slate-900 h-screen w-full flex flex-col items-center justify-center"
        id="main"
      >
        <div>{views[currentView]}</div>
      </main>
    </>
  );
}

export default App;
