type ITaglogConfig = {
  [accessKey: string]: {
    SERVER_URL: string
    ACCESS_KEY: string
    DEFAULT_CHANNEL: string
  }
}
const taglogConfig: ITaglogConfig = {}

const TAGLOG_SERVER_URL = 'http://api.taglog.io/api'

type ILogRequest = {
  title: string
  data: Record<string, any>
  type: 'EXCEPTION' | 'INFO'
  channel?: string
  accessKey: string
}

interface ITaglogInit {
  accessKey: string
  defaultChannel: string
  serverURL?: string
}

export function taglogInit({
  accessKey,
  defaultChannel,
  serverURL = TAGLOG_SERVER_URL
}: ITaglogInit) {
  taglogConfig[accessKey] = {
    ACCESS_KEY: accessKey,
    DEFAULT_CHANNEL: defaultChannel,
    SERVER_URL: serverURL
  }

  return {
    captureException(
      title: string,
      data: Record<string, any>,
      channel?: string
    ) {
      captureException(title, data, channel, accessKey)
    },
    captureInfo(title: string, data: Record<string, any>, channel?: string) {
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
  data: Record<string, any>,
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
  data: Record<string, any>,
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
  data,
  type,
  accessKey,
  channel
}: ILogRequest) {
  try {
    navigator.sendBeacon(
      `${taglogConfig[accessKey].SERVER_URL}/ingest/${
        channel ? channel : taglogConfig[accessKey].DEFAULT_CHANNEL
      }?accessToken=${accessKey}`,
      JSON.stringify({ title, data, type })
    )
  } catch (e) {
    console.log(e)
  }
}
