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

const DEFAULT_RESIZE_SETTLE_MS = 400

export function getViewportDimensions() {
  const viewport = window.visualViewport
  return {
    width: Math.round(viewport?.width ?? window.innerWidth),
    height: Math.round(viewport?.height ?? window.innerHeight),
  }
}

export function isFullscreenActive() {
  return document.fullscreenElement !== null
}

export async function enterFullscreen(target = document.documentElement) {
  if (isFullscreenActive()) {
    return true
  }

  if (!target?.requestFullscreen) {
    return false
  }

  await target.requestFullscreen()
  return true
}

export function watchViewportAndFullscreen({
  resizeSettleMs = DEFAULT_RESIZE_SETTLE_MS,
  onViewportSettled,
  onFullscreenExit,
  emitInitial = true,
} = {}) {
  let timerId = null

  const emitViewport = () => {
    onViewportSettled?.({
      viewport: getViewportDimensions(),
      fullscreen: isFullscreenActive(),
    })
  }

  const scheduleViewportEmit = () => {
    window.clearTimeout(timerId)
    timerId = window.setTimeout(emitViewport, resizeSettleMs)
  }

  const handleResize = () => {
    scheduleViewportEmit()
  }

  const handleFullscreenChange = () => {
    if (!isFullscreenActive()) {
      onFullscreenExit?.()
    }
    scheduleViewportEmit()
  }

  window.addEventListener('resize', handleResize)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  window.visualViewport?.addEventListener('resize', handleResize)

  if (emitInitial) {
    emitViewport()
  }

  return () => {
    window.clearTimeout(timerId)
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
    window.visualViewport?.removeEventListener('resize', handleResize)
  }
}
