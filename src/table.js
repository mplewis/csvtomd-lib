import {curry} from 'ramda'

export const wrap = curry((outer, count, inner) => {
  if (count <= 0) return inner
  return wrap(outer, count - 1, outer + inner + outer)
})
