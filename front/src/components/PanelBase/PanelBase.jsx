import {secondary, light} from '../../config/colors'
import {borderRadius, padding} from '../../config/ui'

const PanelBase = ({children, style}) => {
  return (
    <div style={{boxSizing: 'border-box', padding: padding, color: light,
      borderRadius: borderRadius, backgroundColor: secondary, ...style
    }}>
      {children}
    </div>
  )
}

export default PanelBase