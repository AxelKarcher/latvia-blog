import {useState} from 'react'
import {MdDelete} from 'react-icons/md'
import {IoLocationSharp} from 'react-icons/io5'

import './Post.scss'
import PanelBase from '../PanelBase/PanelBase'
import {margin} from '../../config/ui'
import {light} from '../../config/colors'
import Button from '../Button/Button'
import {remove} from '../../api/post'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

const Post = ({data, style, isAdmin, handleRefresh}) => {

  const [modalStatus, setModalStatus] = useState(false)

  const handleDelete = () => {
    setModalStatus(false)

    remove(data?.imageKey)
      .then(handleRefresh)
      .catch((err) => console.error('err:', err))
  }

  return (
    <PanelBase style={{width: '100%', fontWeight: 'bold', display: 'flex', flexDirection: 'column', ...style}}>
      <ConfirmModal
        title='Confirmer la suppression'
        isOn={modalStatus}
        handleClose={() => setModalStatus(false)}
        handleConfirm={handleDelete}
      />
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginBottom: margin}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 30}}>
          <span>{data?.title}</span>
          {
            isAdmin &&
            <Button
              icon={<MdDelete />}
              action={() => setModalStatus(true)}
            />
          }
        </div>
        {
          data?.location &&
          <div style={{display: 'flex', alignItems: 'center'}}>
            <IoLocationSharp style={{marginRight: margin / 2}} />
            <span>{data?.location}</span>
          </div>
        }
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <img
          style={{border: '2px solid ' + light}}
          src={'https://d7478umur8r5c.cloudfront.net/' + data?.imageKey}
          width='20%'
        />
      </div>
      <div style={{fontWeight: 'normal', fontSize: 20, marginTop: margin}}>
        {data?.description}
      </div>
    </PanelBase>
  )
}

export default Post