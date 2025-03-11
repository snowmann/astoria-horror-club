interface FormatDateOptions {
  weekday: 'short'
}

interface FormatTimeOptions {
  hour: 'numeric'
  minute: 'numeric'
  hour12: boolean
}

export const formatDatetime = (date: string | number | Date): string => {
  const eventDate = new Date(date)
  const day = eventDate.toLocaleDateString('en-US', { weekday: 'short' } as FormatDateOptions)
  const dayOfMonth = eventDate.getDate()
  const time = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  } as FormatTimeOptions)
  return `${day}, ${dayOfMonth} @${time}`
}
