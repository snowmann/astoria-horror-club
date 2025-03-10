import { STATUS_CODES } from '@/app/constants'
import { isNullish } from '@/app/utils.ts/utils'
import { APIError, CollectionBeforeDeleteHook } from 'payload'
import { Resend } from 'resend'

export const beforeEmailDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const { payload } = req
  try {
    const email = await payload.findByID({
      collection: 'emails',
      id,
    })
    if (isNullish(email.resendId)) {
      throw new APIError('beforeEmailDelete: Missing data - resendId', STATUS_CODES.BadRequest)
    }
    const resendId = email.resendId
    const resend = new Resend(process.env.RESEND_FULL_API_KEY || '')
    const resp = await resend.emails.cancel(resendId)
    if (resp.error || isNullish(resp.data)) {
      throw new APIError(
        resp.error?.message ?? 'RESEND: An Unknown Error Occurred',
        STATUS_CODES.ServiceUnavailable,
      )
    }
  } catch (err) {
    let errMessage = 'An Unknown Error Occurred'
    if (err instanceof Error) {
      errMessage = err.message
    }
    throw new APIError(errMessage, STATUS_CODES.InternalServerError)
  }
}
