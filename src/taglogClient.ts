import {
  ILogRequest,
  ITaglogConfig,
  ITaglogInit,
  ITagLogRequest,
  SessionType,
  TagLogInstance
} from './models'
import { autoDetectEnv } from './utils/autoDetectEnv'

const taglogConfig: ITaglogConfig = {}

const logMessageType = 'LOG_TYPE_WEB'

const TAGLOG_SERVER_URL = 'https://api.taglog.io/api'

let shouldCaptureConsole: boolean = false

const session: SessionType = {
  __HEADERS__: {}
}

export function taglogInit({
  accessKey,
  defaultChannel,
  serverURL = TAGLOG_SERVER_URL,
  options = { captureConsole: false, autoDetectHeaders: true }
}: ITaglogInit): TagLogInstance {
  taglogConfig[accessKey] = {
    ACCESS_KEY: accessKey,
    DEFAULT_CHANNEL: defaultChannel,
    SERVER_URL: serverURL
  }

  if (options.captureConsole) shouldCaptureConsole = options.captureConsole

  session.__HEADERS__ = options.session ? options.session.__HEADERS__ : {}

  if (options.autoDetectHeaders) {
    const envHeaders = autoDetectEnv()
    session.__HEADERS__ = {
      ...session.__HEADERS__,
      ...envHeaders
    }
  }

  return {
    captureException,
    captureInfo,
    captureRequest
  }
}

export const setEnvSession = (_session: SessionType) => {
  session.__HEADERS__ = {
    ...session.__HEADERS__,
    ..._session.__HEADERS__
  }
}

function getFirstConfig() {
  for (const accessKey in taglogConfig) {
    return accessKey
  }
  return false
}

export function captureException(
  title: string,
  data?: Record<string, any>,
  channel?: string,
  tags?: string[],
  accessKey?: string
): void {
  const detectedAccessKey = accessKey ? accessKey : getFirstConfig()

  if (detectedAccessKey) {
    logRequestBeacon({
      title,
      data,
      type: 'EXCEPTION',
      channel,
      tags,
      accessKey: detectedAccessKey
    })
  } else {
    if (!shouldCaptureConsole)
      console.error('Logging event to taglog.io failed.')
  }
}

export function captureRequest(
  request: ITagLogRequest,
  channel?: string,
  tags?: string[],
  accessKey?: string
): void {
  const detectedAccessKey = accessKey ? accessKey : getFirstConfig()

  if (detectedAccessKey) {
    logRequestBeacon({
      title: request.url,
      data: {
        method: request.method,
        status: request.status,
        duration: request.duration,
        headers: request.headers,
        body: request.body,
        response: request.response
      },
      type: 'REQUEST',
      channel,
      tags,
      accessKey: detectedAccessKey
    })
  } else {
    if (!shouldCaptureConsole)
      console.error('Logging event to taglog.io failed.')
  }
}

export function captureInfo(
  title: string,
  data?: Record<string, any>,
  channel?: string,
  tags?: string[],
  accessKey?: string
): void {
  const detectedAccessKey = accessKey ? accessKey : getFirstConfig()

  if (detectedAccessKey) {
    logRequestBeacon({
      title,
      data,
      type: 'INFO',
      channel,
      tags,
      accessKey: detectedAccessKey
    })
  } else {
    if (!shouldCaptureConsole)
      console.error('Logging event to taglog.io failed.')
  }
}

function logRequestBeacon({
  title,
  data = {},
  type,
  accessKey,
  channel,
  tags
}: ILogRequest & { tags?: string[] }) {
  try {
    fetch(
      `${taglogConfig[accessKey].SERVER_URL}/ingest/${
        channel ? channel : taglogConfig[accessKey].DEFAULT_CHANNEL
      }`,
      {
        method: 'POST',
        headers: {
          messageType: logMessageType,
          accessToken: accessKey,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          data,
          type,
          tags,
          meta: session.__HEADERS__
        })
      }
    )
  } catch (e) {
    if (!shouldCaptureConsole) console.log(e)
  }
}
