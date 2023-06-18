import { Oval } from 'react-loader-spinner'
import styles from './styles.module.scss'

export const LoadingPage = () => {
  return (
    <div className={styles['loading-mask']}>
      <Oval color="#3C86A9" secondaryColor="#3C86A9" height={100} width={100} />
    </div>
  )
}
