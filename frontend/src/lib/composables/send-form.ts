import type { EasyFetchMethod } from '@/lib/types'
import { easyFetch } from '@/lib/utils/easy-fetch'
import { ApiError, ApiResponse } from '@/lib/classes'
import { fetchErrorHandler } from '@/lib/utils'

export async function useSendForm(path: string, method: EasyFetchMethod, body: any) {
  try {
    const res = await easyFetch({
      url: `${import.meta.env.VITE_API_URL}${path}`,
      method,
      isJson: true,
      body
    })

    if (res instanceof Error) {
      throw res
    }

    if (res instanceof Response) {
      if (res.status !== 200 && res.status !== 201) {
        throw new ApiError(await res.json(), res.status)
      }

      return new ApiResponse(await res.json())
    }
  } catch (err) {
    return fetchErrorHandler(err)
  }
}
