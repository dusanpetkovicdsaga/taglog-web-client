export function autoDetectEnv() {
  return {
    'User-Agent': navigator.userAgent,
    'Accept-Language': navigator.language,
    // origin, referer, host, path etc.
    Origin: window.location.origin,
    Referer: document.referrer,
    Host: window.location.host,
    Path: window.location.pathname
  }
}
