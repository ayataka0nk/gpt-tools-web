import styles from './styles.module.scss'
import { IconProps } from './types'
export const ConfirmIcon = ({ className }: IconProps) => {
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
          points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 
		289.878,367.055 512,144.945 	"
        ></polygon>
      </g>
    </svg>
  )
}
