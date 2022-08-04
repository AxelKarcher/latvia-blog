import './Modal.scss'
import {primary, light} from '../../config/colors'

const Modal = ({isOn, handleClose, title, Body}) => {
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
            <Body handleClose={handleClose} />
          </div>
        </div>
      }
    </>
  )
}

export default Modal