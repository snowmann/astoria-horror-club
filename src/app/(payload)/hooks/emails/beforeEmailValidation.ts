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

  if (isNullish(data) || typeof data?.subject !== 'string' || typeof data?.audience !== 'number') {
    throw new APIError('beforeEmailValidation: Missing data', STATUS_CODES.BadRequest)
  }

  const { payload } = req

  try {
    const audience = await payload.findByID({
      collection: 'audiences',
      id: data.audience.toString(),
    })

    const resend = new Resend(process.env.RESEND_FULL_API_KEY || '')

    if (operation !== 'update') {
      if (typeof data?.resendId !== 'string') {
        throw new APIError('PAYLOAD: Unable to get resendId', STATUS_CODES.InternalServerError)
      }
      const removeResp = await resend.broadcasts.remove(data.resendId)
      if (removeResp.error || isNullish(removeResp.data)) {
        throw new APIError(
          removeResp.error?.message ?? 'PAYLOAD: Unable to get resendId',
          STATUS_CODES.ServiceUnavailable,
        )
      }
    }

    const resp = await resend.broadcasts.create({
      from: AHC_EMAIL_ADDRESS,
      subject: data.subject,
      name: data.subject,
      audienceId: audience.id.toString(),
      text: 'HARDCODED TEST TEXT',
    })

    if (resp.error || isNullish(resp.data)) {
      throw new APIError(
        resp.error?.message ?? 'RESEND: An Unknown Error Occurred',
        STATUS_CODES.ServiceUnavailable,
      )
    }

    return { ...data, resendId: resp.data.id }
  } catch (err) {
    let errMessage = 'An Unknown Error Occurred'
    if (err instanceof Error) {
      errMessage = err.message
    }
    throw new APIError(errMessage, STATUS_CODES.InternalServerError)
  }
}
