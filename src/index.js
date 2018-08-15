import {tableToMd} from './table'
import parse from './csv_parser'

const maker = tableToMd('|', '-')

export function fromString (csvString) {
  return fromRows(parse(csvString))
}

export function fromRows (tableRows) {
  return maker(tableRows)
}
