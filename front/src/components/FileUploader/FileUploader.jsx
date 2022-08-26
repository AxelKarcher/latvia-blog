import './FileUploader.scss'
import {padding, borderRadius} from '../../config/ui'
import {primary, light} from '../../config/colors'

const FileUploader = ({label, icon, action, style}) => {
  return (
    <div id='file-uploader-container'>
      <input type='file' id='upload' multiple hidden onChange={(e) => action(e?.target?.files)} />
      <label
        id='input'
        style={{padding: padding, backgroundColor: primary, cursor: 'pointer',
          color: light, borderRadius: borderRadius, height: 40, ...style
        }}
        htmlFor='upload'
      >
        {icon && <span id='icon' style={{marginRight: label ? 10 : 0}}>{icon}</span>}
        {label && <span>{label}</span>}
      </label>
    </div>
  )
}

export default FileUploader