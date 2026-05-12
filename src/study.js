export function createStudySession(prolificParams) {
  return {
    startedAt: new Date().toISOString(),
    participant: {
      prolificPid: prolificParams.prolificPid,
      studyId: prolificParams.studyId,
      sessionId: prolificParams.sessionId,
    },
  }
}
