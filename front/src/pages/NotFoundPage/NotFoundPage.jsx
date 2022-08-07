import {useNavigate} from 'react-router-dom'
import {MdReplyAll} from 'react-icons/md'

import './NotFoundPage.scss'
import {light} from '../../config/colors'
import {margin} from '../../config/ui'
import Button from '../../components/Button/Button'

const NotFoundPage = () => {

  const navigate = useNavigate()

  return (
    <div id='notfoundpage-container' style={{color: light}}>
      <div style={{marginBottom: margin}}>Cette page n'existe pas</div>
      <Button
        icon={<MdReplyAll />}
        action={() => navigate('/home')}
      />
    </div>
  )
}

export default NotFoundPage