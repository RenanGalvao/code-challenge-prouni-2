import { easyFetch, fetchErrorHandler } from '@/lib/utils'
import { ApiError, ApiResponse } from '@/lib/classes'

export async function useLoadItem(path: string, id: string) {
    try {
        const res = await easyFetch({
            url: `${import.meta.env.VITE_API_URL}${path}/${id}`,
            method: 'GET'
        })

        if (res instanceof Error) {
            throw res
        }

        if (res instanceof Response) {
            if (res.status !== 200) {
                throw new ApiError(await res.json(), res.status)
            }

            return new ApiResponse(await res.json())
        }
    } catch (err) {
        return fetchErrorHandler(err)
    }
}