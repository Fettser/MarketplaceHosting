import { ReactNode, FC } from 'react'
import styles from './Asset.module.scss'

export interface StepProps {
  step: number
  stepName: string
  children?: ReactNode
}

const Step:FC<StepProps> = ({stepName, step, children}) => {
  return (
    <div className={styles.step}>
      <div className={styles.header}>
        <div className={styles.number}>
          <h3>{step}</h3>
        </div>
        <h3>{stepName}</h3>
      </div>
      {children}
    </div>
  )
}

export default Step