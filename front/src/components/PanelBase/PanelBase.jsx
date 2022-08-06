import {primary} from '../../config/colors'
import {borderRadius, padding} from '../../config/ui'

const PanelBase = ({children, style}) => {
  return (
    <div style={{boxSizing: 'border-box', padding: padding,
      borderRadius: borderRadius, backgroundColor: primary, ...style
    }}>
      {children}
    </div>
  )
}

export default PanelBase