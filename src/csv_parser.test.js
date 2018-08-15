import hd from 'heredocument'

import parse from './csv_parser'
import parserTestCases from './fixtures/parser_test_cases'

const unsupportedEdgeCases = [
  // these edge cases are considered errors and are not supported
  'Unquoted field with quotes at end of field',
  'Quoted field with whitespace around quotes',
  'Misplaced quotes in data, not as opening quotes',

  // comments are only supported using # for now
  'Comment with non-default character',
  'Multi-character comment string',
  // comments cannot be disabled right now
  'Input with only a commented line, without comments enabled'
]

function allowedTestCase ({description, expected}) {
  if (unsupportedEdgeCases.includes(description)) return false

  // we do not run failure/error type tests
  if (expected.errors.length > 0) return false

  return true
}

const allowedTestCases = parserTestCases.filter(allowedTestCase)

describe('parse', () => {
  allowedTestCases.forEach(({description, input, expected}) => {
    test(description, () => expect(parse(input)).toEqual(expected.data))
  })

  describe('backslash-escaped quotes', () => {
    expect(parse('"quoted \\"foo\\" word",bar')).toEqual([['quoted "foo" word', 'bar']])
  })

  describe('line end with carriage return', () => {
    expect(parse('foo,bar\r\nbaz,quux')).toEqual([['foo', 'bar'], ['baz', 'quux']])
  })
})
