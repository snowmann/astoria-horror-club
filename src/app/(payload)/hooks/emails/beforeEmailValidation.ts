import { AHC_EMAIL_ADDRESS, STATUS_CODES } from '@/app/constants'
import { isNullish } from '@/app/utils.ts/utils'
import { APIError, CollectionBeforeValidateHook } from 'payload'
import { Resend } from 'resend'

export const beforeEmailValidation: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create' && operation !== 'update') {
    return data
  }

  if (
    isNullish(data) ||
    typeof data?.subject !== 'string' ||
    typeof data?.audience !== 'number' ||
    typeof data?.sendDatetime !== 'string'
  ) {
    throw new APIError('beforeEmailValidation: Missing data', STATUS_CODES.BadRequest)
  }

  const { payload } = req

  try {
    const resend = new Resend(process.env.RESEND_FULL_API_KEY || '')

    const audience = await payload.findByID({
      collection: 'audiences',
      id: data.audience.toString(),
    })

    // if this is a create hook, create the broadcast before sending
    // otherwise, use existing resendId to send the broadcast
    let resendId: string = data.resendId
    if (operation === 'create') {
      // the 'name' field should match the subject
      // 'name' refers to a label stored in Resend
      const createResp = await resend.broadcasts.create({
        from: AHC_EMAIL_ADDRESS,
        subject: data.subject,
        name: data.subject,
        audienceId: audience.resendId,
        text: 'HARDCODED TEST TEXT',
      })

      if (createResp.error || isNullish(createResp.data)) {
        throw new APIError(
          createResp.error?.message ?? 'RESEND: Error creating braodcast',
          STATUS_CODES.ServiceUnavailable,
        )
      }
      resendId = createResp.data.id
    }

    // send() schedules the broadcast
    const sendResp = await resend.broadcasts.send(resendId, {
      scheduledAt: data.sendDatetime,
    })

    if (sendResp.error || isNullish(sendResp.data)) {
      throw new APIError(
        sendResp.error?.message ?? 'RESEND: Error scheduling broadcast',
        STATUS_CODES.ServiceUnavailable,
      )
    }

    return { ...data, resendId }
  } catch (err) {
    let errMessage = 'An Unknown Error Occurred'
    if (err instanceof Error) {
      errMessage = err.message
    }
    throw new APIError(errMessage, STATUS_CODES.InternalServerError)
  }
}
