// Tests from Papa Parse: CORE_PARSER_TESTS
// https://github.com/mholt/PapaParse/blob/953dd9873c071a844edc141fdd8fac7cc75c1ab5/tests/test-cases.js#L25

export default [
  {
    description: 'One row',
    input: 'A,b,c',
    expected: {
      data: [['A', 'b', 'c']],
      errors: []
    }
  },
  {
    description: 'Two rows',
    input: 'A,b,c\nd,E,f',
    expected: {
      data: [['A', 'b', 'c'], ['d', 'E', 'f']],
      errors: []
    }
  },
  {
    description: 'Three rows',
    input: 'A,b,c\nd,E,f\nG,h,i',
    expected: {
      data: [['A', 'b', 'c'], ['d', 'E', 'f'], ['G', 'h', 'i']],
      errors: []
    }
  },
  {
    description: 'Whitespace at edges of unquoted field',
    input: 'a,	b ,c',
    notes: 'Extra whitespace should graciously be preserved',
    expected: {
      data: [['a', '	b ', 'c']],
      errors: []
    }
  },
  {
    description: 'Quoted field',
    input: 'A,"B",C',
    expected: {
      data: [['A', 'B', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field with extra whitespace on edges',
    input: 'A," B  ",C',
    expected: {
      data: [['A', ' B  ', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field with delimiter',
    input: 'A,"B,B",C',
    expected: {
      data: [['A', 'B,B', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field with line break',
    input: 'A,"B\nB",C',
    expected: {
      data: [['A', 'B\nB', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted fields with line breaks',
    input: 'A,"B\nB","C\nC\nC"',
    expected: {
      data: [['A', 'B\nB', 'C\nC\nC']],
      errors: []
    }
  },
  {
    description: 'Quoted fields at end of row with delimiter and line break',
    input: 'a,b,"c,c\nc"\nd,e,f',
    expected: {
      data: [['a', 'b', 'c,c\nc'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Quoted field with escaped quotes',
    input: 'A,"B""B""B",C',
    expected: {
      data: [['A', 'B"B"B', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field with escaped quotes at boundaries',
    input: 'A,"""B""",C',
    expected: {
      data: [['A', '"B"', 'C']],
      errors: []
    }
  },
  {
    description: 'Unquoted field with quotes at end of field',
    notes: "The quotes character is misplaced, but shouldn't generate an error or break the parser",
    input: 'A,B",C',
    expected: {
      data: [['A', 'B"', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field with quotes around delimiter',
    input: 'A,""",""",C',
    notes: 'For a boundary to exist immediately before the quotes, we must not already be in quotes',
    expected: {
      data: [['A', '","', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field with quotes on right side of delimiter',
    input: 'A,",""",C',
    notes: 'Similar to the test above but with quotes only after the comma',
    expected: {
      data: [['A', ',"', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field with quotes on left side of delimiter',
    input: 'A,""",",C',
    notes: 'Similar to the test above but with quotes only before the comma',
    expected: {
      data: [['A', '",', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field with 5 quotes in a row and a delimiter in there, too',
    input: '"1","cnonce="""",nc=""""","2"',
    notes: 'Actual input reported in issue #121',
    expected: {
      data: [['1', 'cnonce="",nc=""', '2']],
      errors: []
    }
  },
  {
    description: 'Quoted field with whitespace around quotes',
    input: 'A, "B" ,C',
    notes: 'The quotes must be immediately adjacent to the delimiter to indicate a quoted field',
    expected: {
      data: [['A', ' "B" ', 'C']],
      errors: []
    }
  },
  {
    description: 'Misplaced quotes in data, not as opening quotes',
    input: 'A,B "B",C',
    notes: 'The input is technically malformed, but this syntax should not cause an error',
    expected: {
      data: [['A', 'B "B"', 'C']],
      errors: []
    }
  },
  {
    description: 'Quoted field has no closing quote',
    input: 'a,"b,c\nd,e,f',
    expected: {
      data: [['a', 'b,c\nd,e,f']],
      errors: [{
        'type': 'Quotes',
        'code': 'MissingQuotes',
        'message': 'Quoted field unterminated',
        'row': 0,
        'index': 3
      }]
    }
  },
  {
    description: 'Quoted field has invalid trailing quote after delimiter with a valid closer',
    input: '"a,"b,c"\nd,e,f',
    notes: 'The input is malformed, opening quotes identified, trailing quote is malformed. Trailing quote should be escaped or followed by valid new line or delimiter to be valid',
    expected: {
      data: [['a,"b,c'], ['d', 'e', 'f']],
      errors: [{
        'type': 'Quotes',
        'code': 'InvalidQuotes',
        'message': 'Trailing quote on quoted field is malformed',
        'row': 0,
        'index': 1
      }]
    }
  },
  {
    description: 'Quoted field has invalid trailing quote after delimiter',
    input: 'a,"b,"c\nd,e,f',
    notes: 'The input is malformed, opening quotes identified, trailing quote is malformed. Trailing quote should be escaped or followed by valid new line or delimiter to be valid',
    expected: {
      data: [['a', 'b,"c\nd,e,f']],
      errors: [{
        'type': 'Quotes',
        'code': 'InvalidQuotes',
        'message': 'Trailing quote on quoted field is malformed',
        'row': 0,
        'index': 3
      },
      {
        'type': 'Quotes',
        'code': 'MissingQuotes',
        'message': 'Quoted field unterminated',
        'row': 0,
        'index': 3
      }]
    }
  },
  {
    description: 'Quoted field has invalid trailing quote before delimiter',
    input: 'a,"b"c,d\ne,f,g',
    notes: 'The input is malformed, opening quotes identified, trailing quote is malformed. Trailing quote should be escaped or followed by valid new line or delimiter to be valid',
    expected: {
      data: [['a', 'b"c,d\ne,f,g']],
      errors: [{
        'type': 'Quotes',
        'code': 'InvalidQuotes',
        'message': 'Trailing quote on quoted field is malformed',
        'row': 0,
        'index': 3
      },
      {
        'type': 'Quotes',
        'code': 'MissingQuotes',
        'message': 'Quoted field unterminated',
        'row': 0,
        'index': 3
      }]
    }
  },
  {
    description: 'Quoted field has invalid trailing quote after new line',
    input: 'a,"b,c\nd"e,f,g',
    notes: 'The input is malformed, opening quotes identified, trailing quote is malformed. Trailing quote should be escaped or followed by valid new line or delimiter to be valid',
    expected: {
      data: [['a', 'b,c\nd"e,f,g']],
      errors: [{
        'type': 'Quotes',
        'code': 'InvalidQuotes',
        'message': 'Trailing quote on quoted field is malformed',
        'row': 0,
        'index': 3
      },
      {
        'type': 'Quotes',
        'code': 'MissingQuotes',
        'message': 'Quoted field unterminated',
        'row': 0,
        'index': 3
      }]
    }
  },
  {
    description: 'Quoted field has valid trailing quote via delimiter',
    input: 'a,"b",c\nd,e,f',
    notes: 'Trailing quote is valid due to trailing delimiter',
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Quoted field has valid trailing quote via \\n',
    input: 'a,b,"c"\nd,e,f',
    notes: 'Trailing quote is valid due to trailing new line delimiter',
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Quoted field has valid trailing quote via EOF',
    input: 'a,b,c\nd,e,"f"',
    notes: 'Trailing quote is valid due to EOF',
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Quoted field contains delimiters and \\n with valid trailing quote',
    input: 'a,"b,c\nd,e,f"',
    notes: 'Trailing quote is valid due to trailing delimiter',
    expected: {
      data: [['a', 'b,c\nd,e,f']],
      errors: []
    }
  },
  {
    description: 'Line starts with quoted field',
    input: 'a,b,c\n"d",e,f',
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Line ends with quoted field',
    input: 'a,b,c\nd,e,f\n"g","h","i"\n"j","k","l"',
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l']],
      errors: []
    }
  },
  {
    description: 'Line ends with quoted field, first field of next line is empty, \\n',
    input: 'a,b,c\n,e,f\n,"h","i"\n,"k","l"',
    config: {
      newline: '\n'
    },
    expected: {
      data: [['a', 'b', 'c'], ['', 'e', 'f'], ['', 'h', 'i'], ['', 'k', 'l']],
      errors: []
    }
  },
  {
    description: 'Quoted field at end of row (but not at EOF) has quotes',
    input: 'a,b,"c""c"""\nd,e,f',
    expected: {
      data: [['a', 'b', 'c"c"'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Empty quoted field at EOF is empty',
    input: 'a,b,""\na,b,""',
    expected: {
      data: [['a', 'b', ''], ['a', 'b', '']],
      errors: []
    }
  },
  {
    description: 'Multiple consecutive empty fields',
    input: 'a,b,,,c,d\n,,e,,,f',
    expected: {
      data: [['a', 'b', '', '', 'c', 'd'], ['', '', 'e', '', '', 'f']],
      errors: []
    }
  },
  {
    description: 'Empty input string',
    input: '',
    expected: {
      data: [],
      errors: []
    }
  },
  {
    description: 'Input is just the delimiter (2 empty fields)',
    input: ',',
    expected: {
      data: [['', '']],
      errors: []
    }
  },
  {
    description: 'Input is just empty fields',
    input: ',,\n,,,',
    expected: {
      data: [['', '', ''], ['', '', '', '']],
      errors: []
    }
  },
  {
    description: 'Input is just a string (a single field)',
    input: 'Abc def',
    expected: {
      data: [['Abc def']],
      errors: []
    }
  },
  {
    description: 'Commented line at beginning',
    input: '# Comment!\na,b,c',
    config: { comments: true },
    expected: {
      data: [['a', 'b', 'c']],
      errors: []
    }
  },
  {
    description: 'Commented line in middle',
    input: 'a,b,c\n# Comment\nd,e,f',
    config: { comments: true },
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Commented line at end',
    input: 'a,true,false\n# Comment',
    config: { comments: true },
    expected: {
      data: [['a', 'true', 'false']],
      errors: []
    }
  },
  {
    description: 'Two comment lines consecutively',
    input: 'a,b,c\n#comment1\n#comment2\nd,e,f',
    config: { comments: true },
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Two comment lines consecutively at end of file',
    input: 'a,b,c\n#comment1\n#comment2',
    config: { comments: true },
    expected: {
      data: [['a', 'b', 'c']],
      errors: []
    }
  },
  {
    description: 'Three comment lines consecutively at beginning of file',
    input: '#comment1\n#comment2\n#comment3\na,b,c',
    config: { comments: true },
    expected: {
      data: [['a', 'b', 'c']],
      errors: []
    }
  },
  {
    description: 'Entire file is comment lines',
    input: '#comment1\n#comment2\n#comment3',
    config: { comments: true },
    expected: {
      data: [],
      errors: []
    }
  },
  {
    description: 'Comment with non-default character',
    input: 'a,b,c\n!Comment goes here\nd,e,f',
    config: { comments: '!' },
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Bad comments value specified',
    notes: 'Should silently disable comment parsing',
    input: 'a,b,c\n5comment\nd,e,f',
    config: { comments: 5 },
    expected: {
      data: [['a', 'b', 'c'], ['5comment'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Multi-character comment string',
    input: 'a,b,c\n=N(Comment)\nd,e,f',
    config: { comments: '=N(' },
    expected: {
      data: [['a', 'b', 'c'], ['d', 'e', 'f']],
      errors: []
    }
  },
  {
    description: 'Input with only a commented line',
    input: '#commented line',
    config: { comments: true, delimiter: ',' },
    expected: {
      data: [],
      errors: []
    }
  },
  {
    description: 'Input with only a commented line and blank line after',
    input: '#commented line\n',
    config: { comments: true, delimiter: ',' },
    expected: {
      data: [['']],
      errors: []
    }
  },
  {
    description: 'Input with only a commented line, without comments enabled',
    input: '#commented line',
    config: { delimiter: ',' },
    expected: {
      data: [['#commented line']],
      errors: []
    }
  },
  {
    description: 'Input without comments with line starting with whitespace',
    input: 'a\n b\nc',
    config: { delimiter: ',' },
    notes: '" " == false, but " " !== false, so === comparison is required',
    expected: {
      data: [['a'], [' b'], ['c']],
      errors: []
    }
  },
  {
    description: 'Multiple rows, one column (no delimiter found)',
    input: 'a\nb\nc\nd\ne',
    expected: {
      data: [['a'], ['b'], ['c'], ['d'], ['e']],
      errors: []
    }
  },
  {
    description: 'One column input with empty fields',
    input: 'a\nb\n\n\nc\nd\ne\n',
    expected: {
      data: [['a'], ['b'], [''], [''], ['c'], ['d'], ['e'], ['']],
      errors: []
    }
  }
]
