import {curry, head, join, length, map, max, pipe, reduce, repeat, tail, transpose, unnest, zip} from 'ramda'

const maxIn = reduce(max, -Infinity)
const lengthOfLongest = pipe(map(length), maxIn)

export const wrap = curry((outer, count, inner) => {
  if (count <= 0) return inner
  return wrap(outer, count - 1, outer + inner + outer)
})

export const colWidths = table => transpose(table).map(lengthOfLongest)

export const rowToMd = curry((vertDiv, widths, cells) => {
  const makeRow = pipe(
    map(wrap(' ', 1)),
    join(vertDiv),
    wrap(vertDiv, 1)
  )
  const paddedCells =
    zip(widths, cells).map(([width, cell]) => cell.padEnd(width))
  return makeRow(paddedCells)
})

export const dividerRow = curry((vertDiv, horizDiv, widths) => {
  const repeated = curry(pipe(repeat, join('')))
  const horizDivCells = widths.map(repeated(horizDiv))
  return rowToMd(vertDiv, widths, horizDivCells)
})

export const tableToMd = curry((vertDiv, horizDiv, table) => {
  const widths = colWidths(table)
  const divider = dividerRow(vertDiv, horizDiv, widths)
  const rows = table.map(rowToMd(vertDiv, widths))
  const assembled = unnest([[head(rows)], [divider], tail(rows)])
  return join('\n', assembled)
})
