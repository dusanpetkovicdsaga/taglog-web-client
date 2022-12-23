export type ITaglogConfig = {
  [accessKey: string]: {
    SERVER_URL: string
    ACCESS_KEY: string
    DEFAULT_CHANNEL: string
  }
}
export type ILogRequest = {
  title: string
  data?: Record<string, any>
  type: 'EXCEPTION' | 'INFO'
  channel?: string
  accessKey: string
}

export interface ITaglogInit {
  accessKey: string
  defaultChannel: string
  serverURL?: string
}

export interface TagLogInstance {
  captureException(
    title: string,
    data?: Record<string, any>,
    channel?: string
  ): void
  captureInfo(title: string, data?: Record<string, any>, channel?: string): void
}
