import { ObjectSchema } from 'yup'
import { fetchErrorHandler } from '@/lib/utils'

export function validateForm(data: any, schema: ObjectSchema<any>) {
  try {
    schema.validateSync(data, { abortEarly: false })
  } catch (err) {
    return fetchErrorHandler(err)
  }
}
