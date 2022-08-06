import './TextField.scss'
import {primary, light} from '../../config/colors'

const TextField = ({label, action, value, disabled, style,
  fullWidth, isPassword}) => {
  return (
    <div
      id='textfield-container'
      style={{color: light, cursor: disabled ? 'not-allowed' : 'auto',
        width: fullWidth ? '100%' : 'auto', ...style
      }}
    >
      {label && <div style={{marginBottom: 3}}>{label}</div>}
      <input
        disabled={disabled}
        type={isPassword ? 'password' : ''}
        id='input'
        style={{color: disabled ? 'grey' : light, border: '2px solid ' + light,
          backgroundColor: disabled ? 'lightgrey' : primary,
          width: fullWidth ? '100%' : 'auto'
        }}
        value={value}
        onChange={(e) => action(e.target.value)}
      />
    </div>
  )
}

export default TextField