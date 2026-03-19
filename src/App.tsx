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
        onQuit={() => {
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
        className="w-full bg-slate-900 h-screen  flex flex-col items-center justify-center md:px-38.5 px-6 lg:px-0"
        id="main"
      >
        {views[currentView]}
      </main>
    </>
  );
}

export default App;
