import './styles.css'
import { createStudySession } from './study.js'
import { readProlificParams } from './prolific.js'

const app = document.querySelector('#app')
const prolific = readProlificParams()
const session = createStudySession(prolific)

app.innerHTML = `
  <main class="container">
    <h1>HCI Study Template</h1>
    <p class="muted">Use this starter to quickly prototype study tasks.</p>

    <section class="card" aria-label="Participant info">
      <h2>Participant</h2>
      <p><strong>PROLIFIC_PID:</strong> <span data-field="prolificPid"></span></p>
      <p><strong>STUDY_ID:</strong> <span data-field="studyId"></span></p>
      <p><strong>SESSION_ID:</strong> <span data-field="sessionId"></span></p>
    </section>

    <section class="card" aria-label="Study session">
      <h2>Session</h2>
      <p><strong>Started:</strong> <span data-field="startedAt"></span></p>
      <p><strong>Condition:</strong> <span data-field="condition"></span></p>
    </section>
  </main>
`

const textFields = {
  prolificPid: session.participant.prolificPid,
  studyId: session.participant.studyId,
  sessionId: session.participant.sessionId,
  startedAt: new Date(session.startedAt).toLocaleString(),
  condition: session.condition,
}

Object.entries(textFields).forEach(([field, value]) => {
  const target = app.querySelector(`[data-field="${field}"]`)
  if (target) {
    target.textContent = value
  }
})
