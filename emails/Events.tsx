import * as React from 'react'
import Events from '../src/app/(payload)/components/email/Events'

export function EventsEmail() {
  const defaultProps = {
    title: 'Eraserhead Screening',
    subtitle: 'A Night of Cult Classics',
    date: '2025-03-16T19:00:00-05:00',
    image: 'https://placecats.com/310/310',
    location: 'Focal Point Beer Co.',
    price: '$10',
    content:
      "Join us for a night of cult classics with a rare screening of David Lynch's Eraserhead. Enjoy the film with fellow enthusiasts at Focal Point Beer Co. in Astoria, NY. Don't miss this unique event!",
    url: 'https://astoriahorrorclub.com/events',
  }

  return <Events {...defaultProps}></Events>
}

export default EventsEmail
