import * as React from 'react'
import Events from '@/app/(payload)/components/email/Events'

export function EventsEmail() {
  const defaultProps = {
    title: 'Eraserhead Screening',
    subtitle: 'A Night of Cult Classics',
    datetime: '2025-03-16T19:00:00-05:00',
    image: 'https://placecats.com/310/310',
    location: 'Focal Point Beer Co.',
    price: '$10',
    content:
      "Join us for a night of cult classics with a rare screening of David Lynch's Eraserhead. Enjoy the film with fellow enthusiasts at Focal Point Beer Co. in Astoria,",
    url: 'https://google.com',
  }

  return <Events {...defaultProps} />
}

export default EventsEmail
