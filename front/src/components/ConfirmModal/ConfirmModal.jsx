import {GiConfirmed, GiCancel} from 'react-icons/gi'

import Button from '../Button/Button'
import {margin} from '../../config/ui'
import ModalBase from '../ModalBase/ModalBase'

const ConfirmModal = ({isOn, handleClose, title, handleConfirm}) => {
  return (
    <ModalBase
      style={{display: 'flex'}}
      isOn={isOn}
      handleClose={handleClose}
      title={title}
    >
      <Button
        style={{marginRight: margin * 2}}
        action={handleClose}
        icon={<GiCancel />}
      />
      <Button
        action={handleConfirm}
        icon={<GiConfirmed />}
      />
    </ModalBase>
  )
}

export default ConfirmModal