import {useState} from 'react'

const useApi = (apiFunc) => {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const request = async (...args) => {
    try {
      setIsLoading(true)
      const res = await apiFunc(...args)
      setData(res.data)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }
  }

  return {data, isLoading, request, isError}
}

export default useApi