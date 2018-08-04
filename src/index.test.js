import hd from 'heredocument'

import { fromRows, fromString } from './index'

const expected = hd`
      | Name                  | Position   | Wanted |
      | --------------------- | ---------- | ------ |
      | Andromedus, Darrow au | Leader     | Yes    |
      | Augustus, Victoria au | Accomplice | Yes    |
    `.trim()

describe('fromString', () => {
  test('creates the correct table, handling commas', () => {
    const input = hd`
      Name,Position,Wanted
      "Andromedus, Darrow au",Leader,Yes
      "Augustus, Victoria au",Accomplice,Yes
    `.trim()
    expect(fromString(input)).toEqual(expected)
  })
})

describe('fromRows', () => {
  test('creates the correct table, handling commas', () => {
    const input = [
      ['Name', 'Position', 'Wanted'],
      ['Andromedus, Darrow au', 'Leader', 'Yes'],
      ['Augustus, Victoria au', 'Accomplice', 'Yes']
    ]
    expect(fromRows(input)).toEqual(expected)
  })
})
