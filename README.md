# hci-study-template

Simple, fast boilerplate for vanilla JavaScript HCI studies (e.g., Prolific tasks).

## Project structure

```
hci-study-template/
├── public/
│   └── assets/
├── src/
│   ├── main.js
│   ├── styles.css
│   ├── study.js
│   ├── prolific.js
│   └── utils/
├── data/
│   └── example.json
├── index.html
├── package.json
├── vite.config.js
├── .env
├── README.md
└── .gitignore
```

## Quick start

```bash
npm install
npm run dev
```

Open the URL from Vite (usually `http://localhost:5173`).

## Prolific URL example

Use query params in your study launch link:

```text
http://localhost:5173/?PROLIFIC_PID=test-user&STUDY_ID=study-123&SESSION_ID=session-abc
```

## Fullscreen + viewport handling

`src/study.js` now exposes task helpers for fullscreen studies:

- `enterFullscreen(target)` to request fullscreen for your task container
- `getViewportDimensions()` to read the current viewport width/height
- `watchViewportAndFullscreen(...)` to react to fullscreen exits and settled viewport size changes

Viewport callbacks are debounced by default so dimensions are only emitted after resize settles (useful for slower fullscreen transitions, such as macOS).

## Build for deployment

```bash
npm run build
npm run preview
```
