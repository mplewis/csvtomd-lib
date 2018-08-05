# csvtomd-lib

Generate Markdown tables from CSV data.

# Usage

```js
import csvToMd from 'csvtomd-lib'

const csvString = `
Name,Position,Wanted
"Andromedus, Darrow au",Leader,Yes
"Augustus, Victoria au",Accomplice,Yes
`.trim()

const csvTable = [
  ['Name', 'Position', 'Wanted'],
  ['Andromedus, Darrow au', 'Leader', 'Yes'],
  ['Augustus, Victoria au', 'Accomplice', 'Yes']
]

// Both of these return the same Markdown table string
csvToMd.fromString(csvString)
csvToMd.fromTable(csvTable)
```

# Example Output

```
| Name                  | Position   | Wanted |
| --------------------- | ---------- | ------ |
| Andromedus, Darrow au | Leader     | Yes    |
| Augustus, Victoria au | Accomplice | Yes    |
```

renders as:

| Name                  | Position   | Wanted |
| --------------------- | ---------- | ------ |
| Andromedus, Darrow au | Leader     | Yes    |
| Augustus, Victoria au | Accomplice | Yes    |

# License

MIT
