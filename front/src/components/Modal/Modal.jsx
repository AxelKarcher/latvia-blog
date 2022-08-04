import './Modal.scss'
import {primary, light} from '../../config/colors'

const Modal = ({isOn, handleClose, title}) => {
  return (
    <>{
        isOn &&
        <div
          id='modal-container'
          style={{backgroundColor: light + '5'}}
          onClick={handleClose}
        >
          <div
            id='body'
            style={{backgroundColor: light}}
            onClick={(e) => e.stopPropagation()}
          >
            {title && <div id='title' style={{color: primary}}>{title}</div>}
          </div>
        </div>
      }
    </>
  )
}

export default Modal