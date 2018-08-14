import parse from './csv_parser'
import parserTestCases from './fixtures/parser_test_cases'

const unsupportedEdgeCases = [
  'Unquoted field with quotes at end of field',
  'Quoted field with whitespace around quotes',
  'Misplaced quotes in data, not as opening quotes'
]

function allowedTestCase ({description, expected}) {
  // comments are not currently supported
  if (description.match(/\bcomment(s|ed)?\b/i)) return false
  // these edge cases are considered errors and are not supported
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
})
