const FALLBACK = 'missing'

export function readProlificParams(search = window.location.search) {
  const params = new URLSearchParams(search)

  return {
    prolificPid: params.get('PROLIFIC_PID') || FALLBACK,
    studyId: params.get('STUDY_ID') || FALLBACK,
    sessionId: params.get('SESSION_ID') || FALLBACK,
  }
}
