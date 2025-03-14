import EventsEmailTemplate from '@/app/(payload)/components/email/EventsEmailTemplate'
import * as React from 'react'
<<<<<<< Updated upstream:emails/EmailTemplate.tsx
=======
import Events from '../src/app/(payload)/components/emailTemplates/EventsEmailTemplate'
>>>>>>> Stashed changes:emails/Events.tsx

export function EventsEmail() {
  const defaultProps = {
    title: 'Eraserhead Screening',
    subtitle: 'A Night of Cult Classics',
    datetime: '2025-03-16T19:00:00-05:00',
    image: 'https://www.moriareviews.com/rongulator/wp-content/uploads/Leprechaun-1993-poster.jpg',
    location: 'Focal Point Beer Co.',
    price: '$10',
    content:
      "Join us for a night of cult classics with a rare screening of David Lynch's Eraserhead. Enjoy the film with fellow enthusiasts at Focal Point Beer Co. in Astoria,",
    linkUrl: 'google.com',
    linkText: 'Click me',
  }

  return <EventsEmailTemplate {...defaultProps} />
}

export default EventsEmail
