import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {GiConfirmed} from 'react-icons/gi'

import './AuthPage.scss'
import {secondary, light} from '../../config/colors'
import {margin, borderRadius, padding} from '../../config/ui'
import Button from '../../components/Button/Button'
import TextField from '../../components/TextField/TextField'
import {register, login} from '../../api/auth'
import Spinner from '../../components/Spinner/Spinner'

const AuthPage = () => {

  const navigate = useNavigate()

  const [pseudo, setPseudo] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {if (localStorage.getItem('token')) {navigate('/home')}}, [])

  useEffect(() => {setIsError(false)}, [isLogin])

  const handleTry = () => {
    setIsError(false)
    setLoading(true)

    if (isLogin) {
      login(pseudo, password)
        .then(({data}) => handleValues(data))
        .catch(() => setIsError(true))
        .finally(() => setLoading(false))
    } else {
      register(pseudo, password)
        .then(({data}) => handleValues(data))
        .catch(() => setIsError(true))
        .finally(() => setLoading(false))
    }
  }

  const handleValues = (data) => {
    localStorage.setItem('token', data?.token)
    localStorage.setItem('isAdmin', data?.isAdmin)
    navigate('/home')
  }

  return (
    <div id='authpage-container'>
      <div id='title' style={{color: light, marginBottom: margin}}>
        latvia-blog
      </div>
      <div
        id='panel'
        style={{backgroundColor: secondary, borderRadius: borderRadius, padding: padding}}
      >
        <TextField
          onConfirm={handleTry}
          fullWidth
          style={{marginBottom: margin}}
          label='Pseudo'
          value={pseudo}
          action={(e) => setPseudo(e)}
        />
        {
          !isLogin &&
          <TextField
            onConfirm={handleTry}
            fullWidth
            style={{marginBottom: margin}}
            label='Mail'
            value={mail}
            action={(e) => setMail(e)}
          />
        }
        <TextField
          onConfirm={handleTry}
          fullWidth
          isPassword
          style={{marginBottom: margin}}
          label='Mot de passe'
          value={password}
          action={(e) => setPassword(e)}
        />
        {
          loading
          ?
          <Spinner />
          :
          <>
            <Button
              fullWidth
              disabled={!pseudo || (!isLogin && !mail) || !password}
              label={isError ? 'Erreur' : ''}
              style={{marginBottom: margin}}
              icon={<GiConfirmed />}
              action={handleTry}
            />
            <Button
              fullWidth
              label={isLogin ? 'Je n\'ai pas encore de compte' : 'J\'ai déjà un compte'}
              action={() => setIsLogin(!isLogin)}
            />
          </>
        }
      </div>
    </div>
  )
}

export default AuthPage