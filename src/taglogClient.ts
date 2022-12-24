import {
  ILogRequest,
  ITaglogConfig,
  ITaglogInit,
  TagLogInstance
} from './models'
import { parseJavascriptObject } from './utils/parseJavascriptObject'

const taglogConfig: ITaglogConfig = {}

const TAGLOG_SERVER_URL = 'http://api.taglog.io/api'

export function taglogInit({
  accessKey,
  defaultChannel,
  serverURL = TAGLOG_SERVER_URL
}: ITaglogInit): TagLogInstance {
  taglogConfig[accessKey] = {
    ACCESS_KEY: accessKey,
    DEFAULT_CHANNEL: defaultChannel,
    SERVER_URL: serverURL
  }

  return {
    captureException(title, data, channel) {
      captureException(title, data, channel, accessKey)
    },
    captureInfo(title, data, channel) {
      captureInfo(title, data, channel, accessKey)
    }
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
  accessKey?: string
): void {
  const detectedAccessKey = accessKey ? accessKey : getFirstConfig()

  if (detectedAccessKey) {
    logRequestBeacon({
      title,
      data,
      type: 'EXCEPTION',
      channel,
      accessKey: detectedAccessKey
    })
  } else {
    console.error('Logging event to taglog.io failed.')
  }
}

export function captureInfo(
  title: string,
  data?: Record<string, any>,
  channel?: string,
  accessKey?: string
): void {
  const detectedAccessKey = accessKey ? accessKey : getFirstConfig()

  if (detectedAccessKey) {
    logRequestBeacon({
      title,
      data,
      type: 'INFO',
      channel,
      accessKey: detectedAccessKey
    })
  } else {
    console.error('Logging event to taglog.io failed.')
  }
}

function logRequestBeacon({
  title,
  data = {},
  type,
  accessKey,
  channel
}: ILogRequest) {
  try {
    fetch(
      `${taglogConfig[accessKey].SERVER_URL}/ingest/${
        channel ? channel : taglogConfig[accessKey].DEFAULT_CHANNEL
      }`,
      {
        method: 'POST',
        headers: {
          accessToken: accessKey,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parseJavascriptObject({ title, data, type }))
      }
    )
  } catch (e) {
    console.log(e)
  }
}
