# web-based-tic-tac-toe-186216-186225

This repository contains a Vite + React powered Tic Tac Toe game with a three-page flow
(Start → Config → Game) and support for both local two-player and vs-computer modes
with three AI difficulty levels (Easy, Medium, Hard).

## Running the frontend

From the `frontend` directory:

```bash
npm install
npm run dev
```

By default the app will be available on `http://localhost:3000` (or the configured Vite port).
No backend or environment variables are required to play the game.

## App flow and game modes

The UI is split into three client-side routed pages:

1. **Start page** (`/`)
   - Choose **Single Player** for a local two-player match on one device.
   - Choose **Vs Computer** to play against the AI.
   - Both buttons navigate to the Config page, passing a suggested initial mode.

2. **Config page** (`/config`)
   - **Game mode:**
     - _Single Player_ → human vs human (`mode = "hvh"`).
     - _Vs Computer_ → human vs AI (`mode = "hvc"`).
   - **Difficulty (only for Vs Computer):**
     - _Easy_ – AI picks a random legal move.
     - _Medium_ – AI wins if possible, otherwise blocks an imminent human win, otherwise plays randomly.
     - _Hard_ – AI uses an optimal minimax-based strategy with simple heuristics (center/corners priority).
   - **Player icon:**
     - Choose whether you play as **X** (first) or **O** (second). In vs-computer mode the AI uses the other symbol.
   - Press **Continue** to navigate to `/game` with the selected settings.

3. **Game page** (`/game`)
   - Renders the Tic Tac Toe board and status using the selected configuration.
   - Displays small info chips for **Mode**, **Difficulty**, and **Player icon**.
   - In **Single Player (hvh)** mode:
     - Behaviour matches a classic two-player local game.
     - Includes **Undo** and **Redo** controls.
   - In **Vs Computer (hvc)** mode:
     - You play as the selected icon; the computer plays the opposite icon.
     - The board is temporarily disabled while the AI is “thinking” and after the game is over.
     - Undo/redo are disabled to keep the turn order simple.
   - Use the buttons below the card to go **Back to start** or **Change settings** (return to Config).

## Theming

The Ocean Professional theme (colors, shadows, radii) is defined via CSS variables in:

- `frontend/src/style.css` under the `:root` selector.

To adjust the look and feel (e.g., primary/secondary colors, background, or shadows), update those variables and restart the dev server if needed.