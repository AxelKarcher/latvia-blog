import './App.scss'
import {background} from './config/colors'
import Button from './components/Button/Button'

const App = () => {

  const test = () => {
    console.log('HERE')
  }

  return (
    <div id='app-container' style={{backgroundColor: background}}>
      <Button
        label='TEST'
        action={test}
      />
    </div>
  )
}

export default App
