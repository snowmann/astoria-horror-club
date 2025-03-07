import { STATUS_CODES } from '@/app/constants'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

type ContactsPostReq = {
  firstName: string
  lastName: string
  email: string
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email }: ContactsPostReq = await req.json()
    console.log({ firstName, lastName, email })
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: STATUS_CODES.BadRequest },
      )
    }

    const resend = new Resend(process.env.RESEND_FULL_API_KEY)

    const audienceResp = await resend.audiences.list()
    // We only support sending to the General audience list
    // Adding other lists will require us to subscribe to a plan
    const audience = audienceResp.data?.data[0]
    console.log({ audience })
    if (audienceResp.error || !audience) {
      return NextResponse.json(
        {
          error: { message: audienceResp.error?.message ?? 'Could not fetch Resend Audiences' },
        },
        { status: STATUS_CODES.ServiceUnavailable },
      )
    }

    const audienceId = audience.id
    console.log({ audienceId })
    const { data, error } = await resend.contacts.create({
      audienceId,
      firstName,
      lastName,
      email,
    })
    console.log({ data, error })
    const success = !!data && !error
    const status = success ? STATUS_CODES.Created : STATUS_CODES.InternalServerError

    return NextResponse.json({ data, error, success }, { status })
  } catch (err) {
    let message = 'An unkownn error occurred'
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
