import { chooseCondition } from './utils/random.js'

export function createStudySession(prolificParams) {
  return {
    startedAt: new Date().toISOString(),
    condition: chooseCondition(['control', 'treatment']),
    participant: {
      prolificPid: prolificParams.prolificPid,
      studyId: prolificParams.studyId,
      sessionId: prolificParams.sessionId,
    },
  }
}
