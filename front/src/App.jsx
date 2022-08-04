import {useState} from 'react'

import './App.scss'
import Button from './components/Button/Button'
import {background} from './config/colors'
import Modal from './components/Modal/Modal'
const App = () => {

  const [modalBool, setModalBool] = useState(false)
  return (
    <div id='app-container' style={{backgroundColor: background}}>
      <Modal
        isOn={modalBool}
        handleClose={() => setModalBool(false)}
        title='Test modale'
      />
      <Button
        label='Test'
        action={() => setModalBool(true)}
      />
    </div>
  )
}

export default App
