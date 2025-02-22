import * as taglog from './taglogClient'

declare global {
  interface Window {
    taglog: typeof taglog
  }
}

window.taglog = taglog

import './scripts/capture'
