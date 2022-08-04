import './Spinner.scss'
import {primary} from '../../config/colors'

const Spinner = () => {
  return (
    <div
      id='spinner-container'
      style={{borderTopColor: primary, borderBottomColor: primary}}
    />
  )
}

export default Spinner