import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'
import { STATUS_CODES } from '@/app/constants'

export async function GET(req: NextRequest) {
  try {
    // Fetch events from the Payload CMS `events` collection
    console.log('wants to return events')
    const events = await payload.find({
      collection: 'events',
      limit: 10, // Adjust the limit as needed
    })
    console.log('events', events)
    // Check if the events array is empty
    if (events.docs.length === 0) {
      return NextResponse.json({ message: 'No events found' }, { status: STATUS_CODES.OK })
    }

    // Return the events data
    return NextResponse.json(events, { status: STATUS_CODES.OK })
  } catch (err) {
    console.log('error', err)
    let message = 'An unknown error occurred'
    if (typeof err === 'string') {
      message = err
    } else if (err instanceof Error) {
      message = err.message
    }
    return NextResponse.json(
      {
        error: { message },
      },
      { status: STATUS_CODES.InternalServerError },
    )
  }
}
