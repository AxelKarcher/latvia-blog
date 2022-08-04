import {useState} from 'react'

const useApi = (apiFunc) => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState()

  const req = async (...args) => {
    try {
      setLoading(true)
      const res = await apiFunc(...args)
      setData(res.data)
      setLoading(false)
    } catch (error) {
      setErr(error)
      setLoading(false)
    }
  }

  return {data, loading, req, err}
}

export default useApi