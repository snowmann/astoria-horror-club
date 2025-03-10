'use client'
import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'

interface Event {
  id: string
  title: string
  description: string
  date: string
  image: string
  location: string
  price: string
  link: string
}

export default function EventsFeed() {
  // const [events, setEvents] = useState<Event[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   async function fetchEvents() {
  //     try {
  //       console.log('do we get here?')
  //       const response = await fetch('http://localhost:3000/api/events')
  //       console.log('response', response)
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch events')
  //       }
  //       const data = await response.json()
  //       console.log('data', data)
  //       setEvents(data.docs) // Assuming the response has a `docs` field containing the events
  //     } catch (error) {
  //       console.log('error', error)
  //       // setError(error.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   console.log('here?')
  //   fetchEvents()
  // }, [])

  // if (loading) {
  //   return <p>Loading...</p>
  // }

  // if (error) {
  //   return <p>Error: {error}</p>
  // }

  // return (
  //   <div>
  //     <h1>Events</h1>
  //     {events.map((event) => (
  //       <div key={event.id} className="event">
  //         <h2>{event.title}</h2>
  //         <h3>{event.description}</h3>
  //         {/* <img src={event.image} alt={event.title} /> */}
  //         <p>
  //           <strong>Location:</strong> {event.location}
  //         </p>
  //         <p>
  //           <strong>Price:</strong> {event.price}
  //         </p>
  //         {/* <p>{event.content}</p> */}
  //         <a href={event.link}>Learn More</a>
  //       </div>
  //     ))}
  //   </div>
  // )https://placecats.com/320/320
  const event = {
    id: '1',
    title: 'Astoria Horror Club and 16mm Cinema Present: Eraserhead',
    description:
      'It’s the cult film that put the late master David Lynch on the map — Eraserhead. A bizarre exploration of imagery, metaphor, and psychology with an ickiness that will haunt your dreams. Join @astoriahorrorclub and @16mmcinema at @focalpointbeer for an extremely rare screening of Eraserhead on film',
    date: '2025-03-16T00:00:00Z',
    image: 'https://placecats.com/320/320',
    location: 'Focal Point Beer Co.',
    price: '$10',
    link: 'https://www.astoria.com/',
  }

  return <EventCard event={event} />
}
