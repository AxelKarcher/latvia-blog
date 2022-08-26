import {useState, useEffect} from 'react'
import {GiConfirmed} from 'react-icons/gi'

import ModalBase from '../ModalBase/ModalBase'
import Button from '../Button/Button'
import TextField from '../TextField/TextField'
import {margin} from '../../config/ui'
import {light} from '../../config/colors'
import {create} from '../../api/post'
import FileUploader from '../FileUploader/FileUploader'

const AddModal = ({isOn, handleClose, title: modalTitle, handleRefresh}) => {

  const [title, setTitle] = useState()
  const [location, setLocation] = useState()
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [description, setDescription] = useState()

  useEffect(() => {
    setTitle()
    setLocation()
    setFile()
    setDescription()
  }, [isOn])

  const encode = (target) => {
    let file = target[0]
    let reader = new FileReader()

    setFile(file)

    reader.onloadend = () => {setPreview(reader.result)}
    reader.readAsDataURL(file)
  }

  const handleSend = () => {
    create(title, location, file, description)
      .then(() => {
        handleRefresh()
        handleClose()
      })
      .catch((err) => console.error('err:', err))
  }

  return (
    <ModalBase
      isOn={isOn}
      handleClose={handleClose}
      title={modalTitle}
      style={{display: 'flex'}}
    >
      <div style={{display: 'flex', flexDirection: 'column',
        alignItems: 'center', marginRight: margin * 2
      }}>
        <TextField
          style={{marginBottom: margin}}
          label='Titre du post'
          value={title || ''}
          action={(e) => setTitle(e)}
        />
        <TextField
          style={{marginBottom: margin}}
          label='Lieux'
          value={location || ''}
          action={(e) => setLocation(e)}
        />
        <TextField
          style={{marginBottom: margin}}
          lines='7'
          label='Description'
          value={description || ''}
          action={(e) => setDescription(e)}
        />
        <Button
          fullWidth
          disabled={!file || !title}
          icon={<GiConfirmed />}
          action={handleSend}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'space-evenly'
      }}>
        <FileUploader label='Uploader' action={(e) => encode(e)}/>
        {
          file &&
          <img style={{border: '2px solid ' + light}} height={250} src={preview} />
        }
      </div>
    </ModalBase>
  )
}

export default AddModal