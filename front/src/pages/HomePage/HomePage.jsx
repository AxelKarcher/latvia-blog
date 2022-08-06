import './HomePage.scss'
import UserPanel from '../../components/UserPanel/UserPanel'
import useApi from '../../hooks/useApi'
import {create} from '../../api/post'

const HomePage = () => {

  const {data, req, loading} = useApi(create)

  console.log('data:', data)

  return (
    <div id='homepage-container'>
      <UserPanel />
      <input type='file' onChange={(e) => req(e.target.files[0])}/>
    </div>
  )
}

export default HomePage