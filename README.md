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

## Build for deployment

```bash
npm run build
npm run preview
```

## VS Code notes

- Open this folder directly in VS Code.
- Use the integrated terminal for `npm run dev`.
- Duplicate this template by copying the folder or using "Use this template" in GitHub.
