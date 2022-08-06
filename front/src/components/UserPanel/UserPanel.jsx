import {useEffect} from 'react'

import PanelBase from '../PanelBase/PanelBase'
import useApi from '../../hooks/useApi'
import {getInfos} from '../../api/user'
import Spinner from '../../components/Spinner/Spinner'

const flexRow = {
  display: 'flex',
  alignItems: 'center'
}

const UserPanel = () => {

  const {data, req, loading} = useApi(getInfos)

  useEffect(() => {req(localStorage.getItem('token'))}, [])

  return (
    <PanelBase>
      {
        loading || !data
        ?
        <Spinner />
        :
        <div style={{...flexRow, flexDirection: 'column', fontWeight: 'bold'}}>
          <div style={{...flexRow, justifyContent: 'space-between', width: '100%'}}>
            <div>{data?.pseudo}</div>
            <div style={{color: data?.isAdmin ? 'lime' : 'blue'}}>
              {data?.isAdmin ? 'admin' : 'visiteur'}
            </div>
          </div>
          <div>{data?.mail}</div>
        </div>
      }
    </PanelBase>
  )
}

export default UserPanel