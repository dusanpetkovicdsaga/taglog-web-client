;(function () {
  const originalLog = console.log
  console.log = function (title: string, ...rest: any[]) {
    if (window.taglog && window.taglog.getFirstConfig())
      window.taglog.captureInfo(title, rest)
    originalLog.apply(console, [title, ...rest])
  }

  const originalError = console.error
  console.error = function (error: any) {
    if (window.taglog && window.taglog.getFirstConfig()) {
      let errorData: any = {}
      let title = 'Error'
      if (error instanceof Error) {
        errorData = {
          message: error.message,
          stack: error.stack,
          name: error.name
        }
      } else {
        title = `Error: ${error}`
      }
      window.taglog.captureException(title, errorData)
    }
    originalError.apply(console, error)
  }

  const originalWarn = console.warn
  console.warn = function (title: string, ...rest: any[]) {
    if (window.taglog && window.taglog.getFirstConfig()) {
      let warnData: any = {}
      if (rest.length > 0) {
        warnData = rest
      }
      window.taglog.captureInfo(title, warnData)
    }
    originalWarn.apply(console, [title, ...rest])
  }

  const originalInfo = console.info
  console.info = function (title: string, ...rest: any[]) {
    if (window.taglog && window.taglog.getFirstConfig())
      window.taglog.captureInfo(title, rest)
    originalInfo.apply(console, [title, ...rest])
  }

  // handle tracking for all errors that are not handled

  if (window.taglog && window.taglog.getFirstConfig()) {
    // Capture uncaught errors
    window.onerror = function (
      message: string | Event,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) {
      window.taglog.captureException(message.toString(), {
        source: source,
        lineno: lineno,
        colno: colno,
        error: error
      })

      return true // Suppress the default browser error message
    }

    // Capture unhandled promise rejections
    window.addEventListener(
      'unhandledrejection',
      function (event: PromiseRejectionEvent) {
        if (window.taglog && window.taglog.getFirstConfig()) {
          let rejectionData: any = {}
          let title = 'Unhandled promise rejection'
          if (event.reason instanceof Error) {
            rejectionData = {
              message: event.reason.message,
              stack: event.reason.stack,
              name: event.reason.name
            }
          } else {
            title += `: ${event.reason}`
          }
          window.taglog.captureException(title, rejectionData)
          event.preventDefault() // Suppress the default console logging
        }
      }
    )
  }
})()

export {}
