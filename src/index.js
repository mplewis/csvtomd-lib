import Papa from 'papaparse'

import {tableToMd} from './table'

const maker = tableToMd('|', '-')

export function fromString (csvString) {
  return fromRows(Papa.parse(csvString).data)
}

export function fromRows (tableRows) {
  return maker(tableRows)
}
