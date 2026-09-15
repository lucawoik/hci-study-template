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
- `waitForViewportSettle()` to detect when viewport size stops changing across animation frames
- `watchViewportAndFullscreen(...)` to react to fullscreen exits and settled viewport size changes

In the default task flow, fullscreen is requested immediately when the participant starts the task. Viewport callbacks use frame-based settle detection so dimensions are reported only after resizing has stopped (useful for slower fullscreen transitions, such as macOS).

If fullscreen is exited during the task, a dedicated resume screen is shown. Participants can resume by clicking the button, which restarts fullscreen and returns to the task. While fullscreen is active, the page background is switched to black.

## Build for deployment

```bash
npm run build
npm run preview
```
