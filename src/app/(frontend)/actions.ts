'use server'

import { Resend } from 'resend'

type CreateSubscriberArgs = {
  firstName: string
  lastName: string
  email: string
}

export const createSubscriber = async ({ firstName, lastName, email }: CreateSubscriberArgs) => {
  const resend = new Resend(process.env.RESEND_FULL_API_KEY)

  const audienceResp = await resend.audiences.list()

  // We will support sending to the General audience list
  // getting other lists will require us to subscribe to a plan
  const audience = audienceResp.data?.data[0]

  if (audienceResp.error || !audience) {
    return {
      success: false,
      error: { message: audienceResp.error?.message ?? 'Could not fetch Resend Audiences' },
    }
  }

  const audienceId = audience.id

  const contactResp = await resend.contacts.create({
    audienceId,
    firstName,
    lastName,
    email,
  })

  return { success: !contactResp.error && !!contactResp.data, error: contactResp.error }
}
