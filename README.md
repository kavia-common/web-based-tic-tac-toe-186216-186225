# web-based-tic-tac-toe-186216-186225

This repository contains a Vite + React powered Tic Tac Toe game.

## Running the frontend

From the `frontend` directory:

```bash
npm install
npm run dev
```

By default the app will be available on `http://localhost:3000` (or the configured Vite port).
No backend or environment variables are required to play the game.

## Theming

The Ocean Professional theme (colors, shadows, radii) is defined via CSS variables in:

- `frontend/src/style.css` under the `:root` selector.

To adjust the look and feel (e.g., primary/secondary colors, background, or shadows), update those variables and restart the dev server if needed.