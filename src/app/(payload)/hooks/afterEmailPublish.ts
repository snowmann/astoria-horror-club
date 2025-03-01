import {
  HTMLConverterFeature,
  consolidateHTMLConverters,
  convertLexicalToHTML,
  defaultEditorConfig,
  defaultEditorFeatures,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical'
import { CollectionAfterOperationHook } from 'payload'

const afterEmailOperation: CollectionAfterOperationHook<'emails'> = async ({
  args, // arguments passed into the operation
  operation, // name of the operation
  req, // full express request
  result, // the result of the operation, before modifications
  collection, // the collection which this hook is being run on
}) => {
  switch (operation) {
    case 'create':
      return await afterEmailCreate({ args, operation, req, result, collection })
    case 'update':
      return await AfterEmailUpdate({ args, operation, req, result, collection })
    default:
      return result
  }
}

const afterEmailCreate: CollectionAfterOperationHook<'emails'> = async ({
  args, // arguments passed into the operation
  operation, // name of the operation
  req, // full express request
  result, // the result of the operation, before modifications
}) => {
  const { payload } = req
  if (operation !== 'create' || result === null) {
    return result
  }

  const { subject, body, sendDatetime } = result

  const editorConfig = defaultEditorConfig
  editorConfig.features = [...defaultEditorFeatures, HTMLConverterFeature({})]
  const sanitizedEditorConfig = await sanitizeServerEditorConfig(editorConfig, req.payload.config)

  const html = await convertLexicalToHTML({
    converters: consolidateHTMLConverters({
      editorConfig: sanitizedEditorConfig,
    }),
    data: body,
    req,
  })

  // RESEND PARAMS https://resend.com/docs/api-reference/emails/send-email#body-parameters
  await payload.sendEmail({
    to: 't.herrmann227@gmail.com',
    subject,
    html,
    scheduledAt: sendDatetime,
  })

  return result
}

const AfterEmailUpdate: CollectionAfterOperationHook<'emails'> = async ({
  args, // arguments passed into the operation
  operation, // name of the operation
  req, // full express request
  result, // the result of the operation, before modifications
}) => {
  if (operation !== 'update' || result === null) {
    return result
  }

  return result
}

export default afterEmailOperation
