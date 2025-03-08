import { Resend } from 'resend'
import { CollectionBeforeValidateHook } from 'payload'

export const beforeAudienceValidateHook: CollectionBeforeValidateHook = async ({
  data,
  operation,
}) => {
  if (operation !== 'create' || typeof data?.name !== 'string') {
    return data
  }

  const { name } = data
  try {
    const resend = new Resend(process.env.RESEND_FULL_API_KEY || '')
    const resp = await resend.audiences.create({ name })

    if (resp.error) {
      console.error(resp.error)
      return null
    }

    return { ...data, resendId: resp.data?.id }
  } catch (err) {
    console.error(err)
  }
}
