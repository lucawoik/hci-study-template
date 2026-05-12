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
      <p><strong>PROLIFIC_PID:</strong> ${session.participant.prolificPid}</p>
      <p><strong>STUDY_ID:</strong> ${session.participant.studyId}</p>
      <p><strong>SESSION_ID:</strong> ${session.participant.sessionId}</p>
    </section>

    <section class="card" aria-label="Study session">
      <h2>Session</h2>
      <p><strong>Started:</strong> ${new Date(session.startedAt).toLocaleString()}</p>
      <p><strong>Condition:</strong> ${session.condition}</p>
    </section>
  </main>
`
