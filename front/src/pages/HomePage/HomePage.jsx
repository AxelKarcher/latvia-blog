import {useState, useEffect} from 'react'

import './HomePage.scss'

const HomePage = () => {

  const [token, setToken] = useState()

  useEffect(() => {setToken(localStorage.getItem('token'))}, [])

  return (
    <div id='homepage-container'>
      HomePage
    </div>
  )
}

export default HomePage