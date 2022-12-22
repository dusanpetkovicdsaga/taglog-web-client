import { useEffect, useRef } from 'react'
import { ITaglogInit, taglogInit, TagLogInstance } from '../taglogClient'

export function useTaglogInit(options: ITaglogInit) {
  const logger = useRef<undefined | TagLogInstance>()

  useEffect(() => {
    const instance = taglogInit(options)
    logger.current = instance
  }, [])

  return logger.current
}
