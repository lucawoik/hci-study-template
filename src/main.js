import './styles.css'
import {
  createStudySession,
  enterFullscreen,
  isFullscreenActive,
  watchViewportAndFullscreen,
} from './study.js'
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
      const handleNext = () => renderScreen('task')
      nextButton?.addEventListener('click', handleNext)

      return () => {
        nextButton?.removeEventListener('click', handleNext)
      }
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
        <section class="card" aria-label="Fullscreen controls">
          <h2>Fullscreen</h2>
          <p><strong>Status:</strong> <span data-field="fullscreenStatus">Not fullscreen</span></p>
          <p><strong>Viewport:</strong> <span data-field="viewportSize">Unknown</span></p>
          <button class="button-primary" data-action="enterFullscreen">Enter fullscreen</button>
        </section>
      </main>
    `,
    onRender() {
      const viewportStatus = app.querySelector('[data-field="viewportSize"]')
      const fullscreenStatus = app.querySelector('[data-field="fullscreenStatus"]')
      const fullscreenButton = app.querySelector('[data-action="enterFullscreen"]')
      const taskContainer = app.querySelector('main')

      const setFullscreenStatus = () => {
        if (fullscreenStatus) {
          fullscreenStatus.textContent = isFullscreenActive() ? 'Fullscreen' : 'Not fullscreen'
        }
      }

      const stopWatching = watchViewportAndFullscreen({
        onViewportSettled({ viewport }) {
          if (viewportStatus) {
            viewportStatus.textContent = `${viewport.width} × ${viewport.height}`
          }
          setFullscreenStatus()
        },
        onFullscreenExit() {
          setFullscreenStatus()
        },
      })

      const handleFullscreenClick = async () => {
        try {
          await enterFullscreen(taskContainer ?? document.documentElement)
          setFullscreenStatus()
        } catch (error) {
          console.warn('Fullscreen request failed.', error)
        }
      }

      fullscreenButton?.addEventListener('click', handleFullscreenClick)
      setFullscreenStatus()

      return () => {
        stopWatching()
        fullscreenButton?.removeEventListener('click', handleFullscreenClick)
      }
    },
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

function getRequestedScreen() {
  const params = new URLSearchParams(window.location.search)
  const requestedScreen = params.get('screen')

  if (requestedScreen && requestedScreen in screens) {
    return requestedScreen
  }

  return null
}

function renderScreen(name) {
  activeScreenCleanup?.()

  const screen = screens[name]
  if (!screen) {
    console.warn(
      `Unknown screen: "${name}". Available screens: ${Object.keys(screens).join(', ')}`,
    )
    return
  }
  app.innerHTML = screen.template
  populateTextFields()
  activeScreenCleanup = screen.onRender?.() ?? null
}

let activeScreenCleanup = null
const devScreen = getRequestedScreen()
renderScreen(devScreen || 'start')
