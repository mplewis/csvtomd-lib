import {wrap} from './table'

describe('wrap', () => {
  test('wraps strings', () => {
    expect(wrap('#', 1, 'notice')).toBe('#notice#')
    const wrapper1 = wrap('!', 2)
    expect(wrapper1('danger')).toBe('!!danger!!')
  })
})
