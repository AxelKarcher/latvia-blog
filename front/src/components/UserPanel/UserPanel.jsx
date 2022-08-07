import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {TbLogout} from 'react-icons/tb'
import {AiOutlineEdit} from 'react-icons/ai'
import {MdLibraryAdd} from 'react-icons/md'

import PanelBase from '../PanelBase/PanelBase'
import {getInfos} from '../../api/user'
import Spinner from '../../components/Spinner/Spinner'
import {primary} from '../../config/colors'
import {margin} from '../../config/ui'
import Button from '../Button/Button'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import EditUserModal from '../EditUserModal/EditUserModal'
import AddModal from '../AddModal.jsx/AddModal'

const flexRow = {
  display: 'flex',
  alignItems: 'center'
}

const UserPanel = ({handleRefresh}) => {

  const navigate = useNavigate()

  const [confirmModal, setConfirmModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {refresh()}, [])

  const handleDisconnect = () => {
    localStorage.removeItem('token')
    navigate('/auth')
  }

  const refresh = () => {
    setEditModal(false)
    setLoading(true)

    getInfos(localStorage.getItem('token'))
      .then(({data}) => setData(data))
      .finally(() => setLoading(false))
  }

  return (
    <PanelBase>
      <ConfirmModal
        isOn={confirmModal}
        title='Je me déconnecte'
        handleClose={() => setConfirmModal(false)}
        handleConfirm={handleDisconnect}
      />
      <EditUserModal
        isOn={editModal}
        title='Mes informations'
        handleClose={() => setEditModal(false)}
        handleConfirm={refresh}
        data={data}
      />
      <AddModal
        isOn={addModal}
        handleClose={() => setAddModal(false)}
        handleRefresh={handleRefresh}
        title='Créer un post'
      />
      {
        loading || !data
        ?
        <Spinner />
        :
        <div style={{...flexRow, flexDirection: 'column', fontWeight: 'bold', fontSize: 20}}>
          <div style={{...flexRow, justifyContent: 'space-between', width: '100%', marginBottom: margin / 2}}>
            <div>{data?.pseudo}</div>
            <div style={{color: primary}}>
              {data?.isAdmin ? 'admin' : 'visiteur'}
            </div>
          </div>
          <div style={{marginBottom: margin}}>{data?.mail}</div>
          <div style={{...flexRow}}>
            {
              localStorage.getItem('isAdmin') === '1' &&
              <Button
                style={{marginRight: margin}}
                icon={<MdLibraryAdd />}
                action={() => setAddModal(true)}
              />
            }
            <Button
              style={{marginRight: margin}}
              icon={<AiOutlineEdit />}
              action={() => setEditModal(true)}
            />
            <Button icon={<TbLogout />} action={() => setConfirmModal(true)} />
          </div>
        </div>
      }
    </PanelBase>
  )
}

export default UserPanel