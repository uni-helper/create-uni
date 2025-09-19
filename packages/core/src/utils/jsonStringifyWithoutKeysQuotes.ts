export function jsonStringifyWithoutKeysQuotes(obj: object) {
  const jsonString = JSON.stringify(obj, null, 2).slice(1, -1).trim()

  return jsonString.replace(/"(\w+)":/g, '$1:')
}
