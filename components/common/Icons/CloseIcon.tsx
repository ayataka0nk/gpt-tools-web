import { IconProps } from './types'
import styles from './styles.module.scss'

export const CloseIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={[styles['icon'], className].join(' ')}
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <polygon
          points="511.998,70.682 441.315,0 256.002,185.313 70.685,0 0.002,70.692 185.316,256.006 0.002,441.318 
		70.69,512 256.002,326.688 441.315,512 511.998,441.318 326.684,256.006 	"
        ></polygon>
      </g>
    </svg>
  )
}
