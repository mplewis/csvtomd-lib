import {colWidths, rowToMd, wrap} from './table'

describe('wrap', () => {
  test('wraps strings', () => {
    expect(wrap('#', 1, 'notice')).toBe('#notice#')
    const wrapper1 = wrap('!', 2)
    expect(wrapper1('danger')).toBe('!!danger!!')
  })
})

describe('colWidths', () => {
  test('determines the correct column widths', () => {
    const table = [['name', 'id'], ['Virginia Augustus', '1']]
    expect(colWidths(table)).toEqual([17, 2])
  })
})

describe('rowToMd', () => {
  test('turns a row into the correct Markdown', () => {
    const widths = [8, 3, 7]
    const cells = ['Darrow', 'Red', 'Mars']
    const expected = '| Darrow   | Red | Mars    |'
    expect(rowToMd('|', widths, cells)).toEqual(expected)
  })
})
