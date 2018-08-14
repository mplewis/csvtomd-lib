export default function parse (text) {
  if (text === '') return []

  const rows = []
  let chunks = []
  let chunk = ''
  let chars = Array.from(text)
  let pos = 0

  let inQuote = false

  function outOfChars () {
    return pos >= chars.length
  }

  function advance (count = 1) {
    pos += count
  }

  function current (count = 1) {
    return chars.slice(pos, pos + count).join('')
  }

  function emit (char) {
    chunk += char
  }

  function newChunk () {
    chunks.push(chunk)
    chunk = ''
  }

  function newLine () {
    newChunk()
    rows.push(chunks)
    chunks = []
  }

  while (!outOfChars()) {
    if (inQuote) {
      if (current(2) === '\\"') {
        emit('"')
        advance(2)
      } else if (current(2) === '""') {
        emit('"')
        advance(2)
      } else if (current() === '"') {
        inQuote = false
        advance()
      } else {
        emit(current())
        advance()
      }
    } else {
      if (current() === ',') {
        newChunk()
        advance()
      } else if (current() === '"') {
        inQuote = true
        advance()
      } else if (current(2) === '\r\n') {
        newLine()
        advance(2)
      } else if (current() === '\n') {
        newLine()
        advance()
      } else {
        emit(current())
        advance()
      }
    }
  }
  newLine()
  return rows
}
