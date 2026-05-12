import './styles.css'
import { createStudySession } from './study.js'
import { readProlificParams } from './prolific.js'

const app = document.querySelector('#app')
const prolific = readProlificParams()
const session = createStudySession(prolific)

const textFields = {
  prolificPid: session.participant.prolificPid,
  studyId: session.participant.studyId,
  sessionId: session.participant.sessionId,
  startedAt: new Date(session.startedAt).toLocaleString(),
}

const screens = {
  start: {
    template: `
      <main class="container">
        <h1>HCI Study Template</h1>
        <p class="muted">Review your session info, then continue to the task.</p>

        <section class="card" aria-label="Participant info">
          <h2>Participant</h2>
          <p><strong>PROLIFIC_PID:</strong> <span data-field="prolificPid"></span></p>
          <p><strong>STUDY_ID:</strong> <span data-field="studyId"></span></p>
          <p><strong>SESSION_ID:</strong> <span data-field="sessionId"></span></p>
        </section>

        <section class="card" aria-label="Study session">
          <h2>Session</h2>
          <p><strong>Started:</strong> <span data-field="startedAt"></span></p>
        </section>

        <button class="button-primary" data-action="goToTask">Start task</button>
      </main>
    `,
    onRender() {
      const nextButton = app.querySelector('[data-action="goToTask"]')
      nextButton?.addEventListener('click', () => setScreen('task'))
    },
  },
  task: {
    template: `
      <main class="container">
        <h1>Task screen</h1>
        <p class="muted">Implement your study task here.</p>
        <section class="card" aria-label="Task placeholder">
          <h2>Task</h2>
          <p>This is where your task UI goes.</p>
        </section>
      </main>
    `,
  },
}

function populateTextFields() {
  Object.entries(textFields).forEach(([field, value]) => {
    const target = app.querySelector(`[data-field="${field}"]`)
    if (target) {
      target.textContent = value
    }
  })
}

function renderScreen(name) {
  const screen = screens[name]
  if (!screen) return
  app.innerHTML = screen.template
  populateTextFields()
  screen.onRender?.()
}

function setScreen(name) {
  renderScreen(name)
}

setScreen('start')
