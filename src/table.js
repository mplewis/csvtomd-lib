import {curry, length, map, max, pipe, reduce, transpose} from 'ramda'

const maxIn = reduce(max, -Infinity)
const lengthOfLongest = pipe(map(length), maxIn)

export const wrap = curry((outer, count, inner) => {
  if (count <= 0) return inner
  return wrap(outer, count - 1, outer + inner + outer)
})

export const colWidths = table => transpose(table).map(lengthOfLongest)
