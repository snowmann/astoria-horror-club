interface FormatDatetimeOptions {
  weekday: 'short'
}

interface FormatTimeOptions {
  hour: 'numeric'
  minute: 'numeric'
  hour12: boolean
}

export const formatDatetime = (datetime: string | number | Date): string => {
  const eventDate = new Date(datetime)
  const day = eventDate.toLocaleDateString('en-US', { weekday: 'short' } as FormatDatetimeOptions)
  const dayOfMonth = eventDate.getDate()
  const time = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  } as FormatTimeOptions)
  return `${day}, ${dayOfMonth} @ ${time}`
}
