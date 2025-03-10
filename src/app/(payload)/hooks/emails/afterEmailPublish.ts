import { AHC_EMAIL_ADDRESS, STATUS_CODES } from '@/app/constants'
import { isNullish } from '@/app/utils.ts/utils'
import { APIError, CollectionAfterOperationHook } from 'payload'
import { Resend } from 'resend'

export const afterEmailOperation: CollectionAfterOperationHook<'emails'> = async ({
  args,
  operation,
  result,
}) => {
  if (operation !== 'create' && operation !== 'update' && operation !== 'updateByID') {
    return result
  }

  const { resendId, sendDatetime } = args.data

  if (isNullish(resendId) || isNullish(sendDatetime)) {
    throw new APIError('afterEmailOperation: Missing data', STATUS_CODES.BadRequest)
  }

  try {
    const resend = new Resend(process.env.RESEND_FULL_API_KEY || '')

    const resp = await resend.broadcasts.send(resendId, { scheduledAt: sendDatetime })

    if (resp.error || isNullish(resp.data)) {
      throw new APIError(
        resp.error?.message ?? `RESEND: Unable to schedule email broadcast`,
        STATUS_CODES.ServiceUnavailable,
      )
    }

    return result
  } catch (err) {
    let errMessage = 'An Unknown Error Occurred'
    if (err instanceof Error) {
      errMessage = err.message
    }
    throw new APIError(errMessage, STATUS_CODES.InternalServerError)
  }
}
