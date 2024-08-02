import type { EasyFetchMethod, Message } from '@/lib/types'
import { easyFetch, fetchErrorHandler } from '@/lib/utils'
import { ApiError, ApiResponse } from '@/lib/classes'

export async function sendRequest<T>(path: string, method: EasyFetchMethod, body: any = {}): Promise<ApiResponse<T> | { messages: Message[] } | undefined> {
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

      return new ApiResponse<T>(await res.json(), res.status)
    }
  } catch (err) {
    return fetchErrorHandler(err)
  }
}
