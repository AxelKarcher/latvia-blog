import './ModalBase.scss'
import {secondary, light} from '../../config/colors'
import {margin, padding, borderRadius} from '../../config/ui'

const ModalBase = ({children, isOn, handleClose, title, style}) => {
  return (
    <>
      {
        isOn &&
        <div
          id='modalbase-container'
          style={{backgroundColor: light + '5'}}
          onClick={handleClose}
        >
          <div
            id='body'
            style={{backgroundColor: secondary, padding: padding, borderRadius: borderRadius}}
            onClick={(e) => e.stopPropagation()}
          >
            {
              title &&
              <div id='title' style={{color: light, marginBottom: margin}}>{title}</div>
            }
            <div style={{...style}}>{children}</div>
          </div>
        </div>
      }
    </>
  )
}

export default ModalBase