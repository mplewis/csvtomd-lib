import {curry, join, length, map, max, pipe, reduce, transpose, zip} from 'ramda'

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
    map(([width, cell]) => cell.padEnd(width), zip(widths, cells))
  return makeRow(paddedCells)
})
