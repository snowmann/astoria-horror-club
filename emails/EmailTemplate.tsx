import EventsEmailTemplate from '@/app/(payload)/components/email/EventsEmailTemplate'
import { getBlobUrl, getLocationString, Loctions } from '@/lib/utils'
import * as React from 'react'

const emailData = {
  id: 1,
  title: 'Leprechaun Screening',
  content:
    'It must be the luck of the Irish - St. Patrick’s Day is on a Monday. We have decided not to show this movie for the past three years, but the time have finally come.\n' +
    '\n' +
    'LEPRECHAUN\n' +
    '\n' +
    'It’s a horror comedy that doesn’t excel in either genre, but it’s the only way to spend 3/17 at Astoria Horror Club. Join us at Hearst of Gold for what will be a rowdy screening. \n' +
    '\n' +
    'We’ll have an optional drinking game for those celebrating this degenerate holiday. Club starts  at 7pm.',
  date: '2025-03-17T23:00:00.000Z',
  image: {
    id: 1,
    alt: 'Leprechaun 1993 movie poster',
    updatedAt: '2025-03-16T04:47:48.403Z',
    createdAt: '2025-03-16T04:47:48.228Z',
    url: '/api/media/file/Leprechaun-1993-poster.jpg',
    thumbnailURL: null,
    filename: 'Leprechaun-1993-poster.jpg',
    mimeType: 'image/jpeg',
    filesize: 279655,
    width: 1380,
    height: 2048,
    focalX: 50,
    focalY: 50,
  },
  location: 'heartOfGold',
  link: null,
  price: '10',
  updatedAt: '2025-03-16T04:48:17.999Z',
  createdAt: '2025-03-16T04:48:17.985Z',
  _status: 'published',
}

export function EventsEmail() {
  return (
    <EventsEmailTemplate
      title={emailData.title}
      datetime={emailData.date}
      image={getBlobUrl(emailData.image.filename)}
      location={getLocationString(emailData.location as keyof Loctions)}
      price={emailData.price}
      content={emailData.content}
      linkUrl={'astoriahorrorclub.com'}
      linkText={'Read More'}
    />
  )
}

export default EventsEmail
