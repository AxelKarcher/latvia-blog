import {ImDownload3} from 'react-icons/im'
import {GoScreenFull} from 'react-icons/go'

import {borderRadius} from '../../config/ui'
import {light} from '../../config/colors'
import {margin} from '../../config/ui'

const Image = ({src, size, style, noDownload, downloadName, iconsSize, noFull, noBtns}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      fontSize: iconsSize || 25, ...style}}
    >
      <img
        style={{borderRadius: borderRadius, border: '2px solid white',
          marginBottom: !noBtns && (!noDownload || !noFull) ? margin / 2 : 0,
          objectFit: 'cover'
        }}
        src={src}
        width={size}
      />
      {
        !noBtns &&
        <div style={{display: 'flex'}}>
          {
            !noFull &&
            <a href={src} target='_blank' style={{marginRight: margin}}>
              <GoScreenFull style={{color: light}} />
            </a>
          }
          {
            !noDownload &&
            <a download={(downloadName || 'image') + '.jpg'} href={src}>
              <ImDownload3 style={{color: light}} />
            </a>
          }
        </div>
      }
    </div>
  )
}

export default Image