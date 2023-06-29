import { IconProps } from './types'
import styles from './styles.module.scss'

export const SendIcon = ({ className }: IconProps) => {
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
        <path
          d="M487.463,216.139L286.099,12.576C278.137,4.52,267.308,0,255.997,0c-11.312,0-22.13,4.52-30.092,12.576
		L24.541,216.139c-16.438,16.622-16.304,43.437,0.329,59.875c16.613,16.438,43.416,16.294,59.854-0.329l128.955-130.352v324.341
		c0,23.362,18.945,42.327,42.318,42.327c23.382,0,42.327-18.965,42.327-42.327V145.332L427.27,275.684
		c16.438,16.623,43.252,16.767,59.864,0.329C503.758,259.576,503.901,232.761,487.463,216.139z"
        ></path>
      </g>
    </svg>
  )
}
