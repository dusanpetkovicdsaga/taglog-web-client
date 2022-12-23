import { stringifyObject } from './stringifyObject'

describe('stringifyObject()', () => {
  it('should stringify object', () => {
    const stringObj = stringifyObject({ test1: 'test1value' })

    expect(stringObj).toBe('{"test1":"test1value"}')
  })
})
