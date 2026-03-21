import "./index.css";
import Menu from "./components/Menu";
import Game from "./components/Game";
import { useState, useEffect } from "react";

function App() {
  const [firstPlayerChoice, setFirstPlayerChoice] = useState<"X" | "O">(() => {
    const savedFirst = sessionStorage.getItem("firstPlayerChoice");
    return savedFirst ? JSON.parse(savedFirst) : "X";
  });
  const [gameMode, setGameMode] = useState<"cpu" | "human" | null>(() => {
    const savedGameMode = sessionStorage.getItem("gameMode");
    return savedGameMode ? JSON.parse(savedGameMode) : null;
  });
  const [currentView, setCurrentView] = useState<"menu" | "game">(() => {
    const savedView = sessionStorage.getItem("currentView");
    return savedView ? JSON.parse(savedView) : "menu";
  });

  useEffect(() => {
    sessionStorage.setItem(
      "firstPlayerChoice",
      JSON.stringify(firstPlayerChoice),
    );
    sessionStorage.setItem("gameMode", JSON.stringify(gameMode));
    sessionStorage.setItem("currentView", JSON.stringify(currentView));
  }, [firstPlayerChoice, gameMode, currentView]);

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
          sessionStorage.removeItem("board");
          sessionStorage.removeItem("playerTurn");
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
