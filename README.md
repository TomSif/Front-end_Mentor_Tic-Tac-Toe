# Tic Tac Toe - Thomas Sifferle 🚀

![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/TomSif)
[![React](https://img.shields.io/badge/react_19-20232a?style=for-the-badge&logo=react&logocolor=61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-646cff?style=for-the-badge&logo=vite&logocolor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/tailwindcss_v4-0F172A?&logo=tailwindcss&logocolor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

![Design preview for the Tic Tac Toe coding challenge](/images/screen-game.png)

### 🌐 Live Demo:

**[View live site →](https://front-end-mentor-tic-tac-toe.vercel.app/)**

Deployed on Vercel with HTTPS and performance optimizations.

---

# Frontend Mentor - Tic Tac Toe Solution

This is a solution to the [Tic Tac Toe challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the game rules and select their mark (X or O) before starting
- Choose to play against another human or the CPU
- Play the game with alternating turns
- See hover states on empty cells showing their current mark
- View the winner or tie result in a modal
- See updated scores that persist during the session
- Restart the game or quit to the menu
- Play against a CPU that blocks winning moves and tries to win (bonus feature)

### Screenshot

![Desktop](/images/screen-modale.png)

### Links

- Solution URL: [GitHub](https://github.com/TomSif/Front-end_Mentor_Tic-Tac-Toe)
- Live Site URL: [Vercel](https://front-end-mentor-tic-tac-toe.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties via Tailwind CSS v4 `@theme`
- Flexbox
- Mobile-first workflow
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- sessionStorage for state persistence

### What I learned

This was my first project with non-trivial game logic — CPU AI, turn management, win detection, and conditional modals. It consolidated my TypeScript knowledge from the previous BMI Calculator project.

#### CPU AI with priority-based logic

Building a simple but effective AI that makes decisions in order: win if possible, block the opponent, or play randomly. The key insight was passing `cpuMark` as a generic parameter rather than hardcoding "O":

```typescript
const getCpuMove = (board: Board, cpuMark: Mark): number | null => {
  const humanMark = cpuMark === "X" ? "O" : "X";

  // 1. Can CPU win?
  for (const [a, b, c] of WIN_COMBS) {
    if (board[a] === cpuMark && board[b] === cpuMark && board[c] === null)
      return c;
    // ... check all positions
  }

  // 2. Must CPU block?
  for (const [a, b, c] of WIN_COMBS) {
    if (board[a] === humanMark && board[b] === humanMark && board[c] === null)
      return c;
    // ... check all positions
  }

  // 3. Random available cell
  const available = board
    .map((cell, i) => (cell === null ? i : -1))
    .filter((i) => i !== -1);
  return available[Math.floor(Math.random() * available.length)] ?? null;
};
```

#### sessionStorage vs localStorage — intentional choice

I chose sessionStorage over localStorage because game scores should reset when you close the tab (new gaming session), not persist forever. This was a UX decision, not a technical limitation:

```typescript
// Scores persist during session, reset on tab close
sessionStorage.setItem("scoreX", JSON.stringify(scoreX));
```

#### useState initializer function (lazy initialization)

Learning to read from storage only once on mount, not on every render:

```typescript
const [scoreX, setScoreX] = useState<number>(() => {
  const saved = sessionStorage.getItem("scoreX");
  return saved ? JSON.parse(saved) : 0;
});
```

#### Array.find() with destructuring

Using `find()` to detect a winner efficiently, with destructuring directly in the callback:

```typescript
const WIN_COMBS: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

const checkWinner = (board: Board): Mark | null => {
  const winning = WIN_COMBS.find(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[b] === board[c],
  );
  return winning ? board[winning[0]] : null;
};
```

#### Array.every() for tie detection

Checking if all cells are filled and no winner exists:

```typescript
const isTie = board.every((cell) => cell !== null) && winner === null;
```

#### Hover states with conditional rendering

Showing the player's mark as a preview when hovering an empty cell:

```typescript
const [isHovered, setIsHovered] = useState(false);

<button
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {value ? (
    <Icon mark={value} />
  ) : isHovered ? (
    <Icon mark={playerTurn} variant="outline" className="opacity-50" />
  ) : null}
</button>
```

#### Event handler chains and async state

Managing the sequence of operations when a cell is clicked — the CPU needs to see the updated board, not the stale state:

```typescript
const handleCellClick = (index: number) => {
  if (gameIsOver || board[index]) return;

  const newBoard = [...board];
  newBoard[index] = playerTurn;
  setBoard(newBoard);

  const winner = checkWinner(newBoard); // Use newBoard, not board
  if (winner) {
    openModal(winner);
    return; // Early return prevents CPU from playing after human wins
  }

  // CPU plays after a delay
  setTimeout(() => {
    const cpuMove = getCpuMove(newBoard, cpuMark);
    // ...
  }, 500);
};
```

### Continued development

Areas I want to focus on in future projects:

- **Array methods**: `find`, `every`, `filter` — used them successfully but not yet automatic
- **Animations**: Adding Framer Motion for modal transitions and cell interactions
- **Event handler complexity**: The chain of operations in handlers (order, early returns, async setState) still requires careful thought

### AI Collaboration

This project was developed with AI assistance from **Claude** (Anthropic), used as a learning companion and technical mentor.

**How I used AI:**

- **Game logic architecture**: Discussing the structure of win detection and CPU AI before coding
- **Debugging async issues**: Understanding why `board` showed stale values after `setBoard()` and learning to use the new value directly
- **Pattern reinforcement**: Solidifying TypeScript patterns learned in BMI Calculator

**What worked well:**

- Building `getCpuMove` with guidance but writing the logic myself — AI asked questions like "what should happen if the CPU can win?" rather than providing the solution
- Getting immediate explanations when I confused `return` inside `.forEach()` (doesn't exit the function) vs `return` inside `.find()` (used for the predicate)
- Having the progression tracked in a separate file to see patterns across sessions

**Challenges encountered:**

- Initially hardcoded "O" for CPU instead of deriving it from player choice
- Forgot to `return` after `openModal(winner)`, causing CPU to play after human won
- Mixed up `setBoard(cpuPlay)` (wrong — cpuPlay is an index) with `newBoard[cpuPlay] = cpuMark; setBoard(newBoard)` (correct)

**Honest reflection:**

The logic layer of this project was significantly more complex than previous ones. I needed more guidance on the event handler chain (when to use the new board vs state, where to place early returns), but the algorithmic thinking for the AI came more naturally than expected.

## Author

- Website - [Thomas Sifferle](https://thomas-sifferle.com)
- Frontend Mentor - [@TomSif](https://www.frontendmentor.io/profile/TomSif)
