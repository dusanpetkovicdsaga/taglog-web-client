import { useMemo } from 'react'
import { ITaglogInit, taglogInit } from '../taglogClient'

export function useTaglogInit(options: ITaglogInit) {
  const logger = useMemo(() => {
    return taglogInit(options)
  }, [options.accessKey])

  return logger
}
