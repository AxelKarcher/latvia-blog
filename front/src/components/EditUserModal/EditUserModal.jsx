import {useEffect, useState} from 'react'
import {GiConfirmed} from 'react-icons/gi'

import ModalBase from '../ModalBase/ModalBase'
import Button from '../Button/Button'
import TextField from '../TextField/TextField'
import {margin} from '../../config/ui'
import {updateInfos} from '../../api/user'
import Spinner from '../Spinner/Spinner'

const EditUserModal = ({isOn, handleClose, title, data, handleConfirm}) => {

  const [pseudo, setPseudo] = useState()
  const [mail, setMail] = useState()
  const [password, setPassword] = useState()
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsError(false)
    getDefault()
  }, [isOn])

  const getDefault = () => {
    setPseudo(data?.pseudo)
    setMail(data?.mail)
    setPassword(data?.password)
  }

  const handleSend = () => {
    setIsError(false)
    setLoading(true)

    updateInfos(localStorage.getItem('token'), pseudo, mail, password)
      .then(handleConfirm)
      .catch((err) => {
        console.error('err:', err)
        setIsError(true)
      })
      .finally(() => setLoading(false))
  }

  return (
    <ModalBase
      style={{display: 'flex', flexDirection: 'column'}}
      isOn={isOn}
      handleClose={handleClose}
      title={title}
    >
      <TextField
        style={{marginBottom: margin}}
        label='Pseudo'
        value={pseudo || ''}
        action={(e) => setPseudo(e)}
      />
      <TextField
        style={{marginBottom: margin}}
        label='Mail'
        value={mail || ''}
        action={(e) => setMail(e)}
      />
      <TextField
        style={{marginBottom: margin}}
        label='Mot de passe'
        value={password || ''}
        action={(e) => setPassword(e)}
      />
      {
        loading
        ?
        <Spinner />
        :
        <Button
          icon={<GiConfirmed />}
          label={isError ? 'Erreur' : ''}
          action={handleSend}
          disabled={!pseudo || !mail || !password}
        />
      }
    </ModalBase>
  )
}

export default EditUserModal