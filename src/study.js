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

export function waitForViewportSettle({ stableFrameTarget = 2, maxFrames = 30 } = {}) {
  return new Promise((resolve) => {
    let lastViewport = getViewportDimensions()
    let stableFrames = 0
    let frameCount = 0

    const checkViewport = () => {
      const nextViewport = getViewportDimensions()
      if (
        nextViewport.width === lastViewport.width &&
        nextViewport.height === lastViewport.height
      ) {
        stableFrames += 1
      } else {
        stableFrames = 0
        lastViewport = nextViewport
      }

      frameCount += 1
      if (stableFrames >= stableFrameTarget || frameCount >= maxFrames) {
        resolve(lastViewport)
        return
      }

      requestAnimationFrame(checkViewport)
    }

    requestAnimationFrame(checkViewport)
  })
}

export function watchViewportAndFullscreen({
  onViewportSettled,
  onFullscreenExit,
  emitInitial = true,
} = {}) {
  let disposed = false
  let settleRequestId = 0

  const settleAndEmitViewport = async () => {
    const requestId = ++settleRequestId
    const viewport = await waitForViewportSettle()
    if (disposed || requestId !== settleRequestId) {
      return
    }
    onViewportSettled?.({
      viewport,
      fullscreen: isFullscreenActive(),
    })
  }

  const handleResize = () => {
    void settleAndEmitViewport()
  }

  const handleFullscreenChange = () => {
    if (!isFullscreenActive()) {
      onFullscreenExit?.()
    }
    void settleAndEmitViewport()
  }

  window.addEventListener('resize', handleResize)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  window.visualViewport?.addEventListener('resize', handleResize)

  if (emitInitial) {
    void settleAndEmitViewport()
  }

  return () => {
    disposed = true
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
    window.visualViewport?.removeEventListener('resize', handleResize)
  }
}
