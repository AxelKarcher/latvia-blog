import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {GiConfirmed} from 'react-icons/gi'

import './AuthPage.scss'
import {secondary, light} from '../../config/colors'
import {margin, borderRadius, padding} from '../../config/ui'
import Button from '../../components/Button/Button'
import TextField from '../../components/TextField/TextField'
import useApi from '../../hooks/useApi'
import {register, login} from '../../api/auth'
import Spinner from '../../components/Spinner/Spinner'

const AuthPage = () => {

  const navigate = useNavigate()

  const [pseudo, setPseudo] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const {data: registerData, req: registerReq, loading: registerLoading, err: registerErr} = useApi(register)
  const {data: loginData, req: loginReq, loading: loginLoading, err: loginErr} = useApi(login)

  useEffect(() => {
    if (!registerData && !loginData) {return}

    localStorage.setItem('token', isLogin ? loginData : registerData)
    navigate('/home')
  }, [registerData, loginData])

  const handleTry = () => {
    if (isLogin) {
      loginReq(pseudo, password)
    } else {
      registerReq(pseudo, mail, password)
    }
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
          fullWidth
          style={{marginBottom: margin}}
          label='Pseudo'
          value={pseudo}
          action={(e) => setPseudo(e)}
        />
        {
          !isLogin &&
          <TextField
            fullWidth
            style={{marginBottom: margin}}
            label='Mail'
            value={mail}
            action={(e) => setMail(e)}
          />
        }
        <TextField
          fullWidth
          style={{marginBottom: margin}}
          label='Mot de passe'
          value={password}
          action={(e) => setPassword(e)}
        />
        {
          loginLoading || registerLoading
          ?
          <Spinner />
          :
          <>
          <Button
            fullWidth
            disabled={!pseudo || (!isLogin && !mail) || !password}
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