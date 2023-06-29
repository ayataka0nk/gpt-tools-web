import styles from './styles.module.scss'
import { IconProps } from './types'

export const EditIcon = ({ className }: IconProps) => {
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
          d="M506.53,88.263L423.737,5.47c-7.294-7.293-19.118-7.293-26.411,0L47.776,341.176
		c-2.168,2.168-3.769,4.836-4.661,7.768L0.836,487.86c-4.35,14.293,9.011,27.654,23.304,23.305l143.382-43.639h0L506.53,114.675
		C513.823,107.381,513.823,95.556,506.53,88.263z M63.524,465.077l-16.584-16.584l24.373-80.107l47.004,25.29l25.296,47.012
		L63.524,465.077z M453.986,75.041L156.172,374.747l-18.919-18.918l299.72-297.828l17.013,17.012
		C453.986,75.024,453.986,75.03,453.986,75.041z"
        ></path>
      </g>
    </svg>
  )
}
