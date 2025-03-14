export const getNextYearDate = () => {
  const now = new Date()
  const nextYear = new Date()
  nextYear.setFullYear(now.getFullYear() + 1)
  return nextYear
}

export function toTitleCase(str: string) {
  return str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const isNullish = (value: unknown) => {
  return value === null || value === undefined
}

export const isStringNullishOrEmpty = (str: string | null | undefined) => {
  return isNullish(str) || str.length === 0
}
