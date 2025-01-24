import {useState, useEffect, useCallback} from 'react'
export interface Response {
  results: any[]
}

export interface Result {
  id: number
  name: string
  image: string
}

export interface DataState {
  loading: boolean
  data: Result[]
  error: string | null
}
const baseUrl = 'http://admin.gympromanager.com:4003/api'

export const useFetchAPI = (url: string, parameters: any) => {
  const [dataState, setDataState] = useState<DataState>({
    data: [],
    loading: true,
    error: null,
  })

  const handleFetch = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}${url}`)

      if (!response.ok) throw new Error(response.statusText)

      const dataApi = await response.json()
      setDataState((prev) => ({
        ...prev,
        loading: false,
        data: dataApi,
      }))
    } catch (error) {
      setDataState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }))
    }
  }, [])

  useEffect(() => {
    if (dataState.data.length === 0) handleFetch()
  }, [])

  return {
    ...dataState,
  }
}
