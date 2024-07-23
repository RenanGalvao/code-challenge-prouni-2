import type { EasyFetchOptions } from '@/lib/types'
import { useTokenStore } from '@/stores/token'

export async function easyFetch(options: EasyFetchOptions): Promise<unknown> {
  const tokenStore = useTokenStore()
  // set value to null to avoid sending empty values to API
  const replacer = (key: string, value: any) => (value === null ? undefined : value)

  options.method = options.method ?? 'GET'
  options.isJson = options.isJson ?? false

  const fetchOptions = {
    method: options.method,
    headers: Object.assign({}, { Accept: 'application/json' }, options.headers)
  } as Partial<EasyFetchOptions>

  if (['POST', 'PUT', 'DELETE'].includes(options.method)) {
    if (tokenStore.isLoggedIn()) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${tokenStore.accessToken}`
      }
    }

    if (options.body) {
      if (options.isJson) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          'Content-Type': 'application/json'
        }
        fetchOptions.body = JSON.stringify(options.body, replacer)
      } else {
        fetchOptions.headers = {
          ...fetchOptions.headers
        }
        fetchOptions.body = options.body
      }
    }
  }

  try {
    return await fetch(options.url, fetchOptions)
  } catch (err) {
    return err
  }
}
