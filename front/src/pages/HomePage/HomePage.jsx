import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import './HomePage.scss'
import UserPanel from '../../components/UserPanel/UserPanel'
import {getAll} from '../../api/post'
import Spinner from '../../components/Spinner/Spinner'
import {margin} from '../../config/ui'
import Post from '../../components/Post/Post'

const HomePage = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    if (!localStorage.getItem('token')) {navigate('/auth')}

    refresh()
  }, [])

  const refresh = () => {
    getAll()
      .then(({data}) => setData(data))
      .finally(() => setLoading(false))
  }

  return (
    <div id='homepage-container'>
      <div id='left-part' style={{margin: margin * 2, marginRight: 0}}>
        {
          loading
          ?
          <Spinner />
          :
          data?.map((elem, i) => (
            <Post
              key={i}
              data={elem}
              style={{marginBottom: i !== data?.length - 1 ? margin * 2 : 0}}
              isAdmin={localStorage.getItem('isAdmin') === '1' ? true : false}
              handleRefresh={refresh}
            />
          ))
        }
      </div>
      <div id='right-part' style={{margin: margin * 2, top: margin * 2}}>
        <UserPanel handleRefresh={refresh} />
      </div>
    </div>
  )
}

export default HomePage