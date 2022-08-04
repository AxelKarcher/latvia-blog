import './TextField.scss'
import {primary, light} from '../../config/colors'

const TextField = ({label, action, value, disabled, style}) => {
  return (
    <div
      id='textfield-container'
      style={{color: light, cursor: disabled ? 'not-allowed' : 'auto',
        ...style
      }}
    >
      {label && <div style={{marginBottom: 3}}>{label}</div>}
      <input
        disabled={disabled}
        id='input'
        style={{color: disabled ? 'grey' : light, border: '2px solid ' + light,
          backgroundColor: disabled ? 'lightgrey' : primary
        }}
        value={value}
        onChange={(e) => action(e.target.value)}
      />
    </div>
  )
}

export default TextField