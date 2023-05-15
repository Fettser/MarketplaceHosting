import styles from './Radio.module.scss'
import { forwardRef, InputHTMLAttributes } from 'react'
import { useRadioStore } from './RadioGroup'

export type RadioProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

/**
 * Компонент Radio
 * @param {RadioProps} - варианты анимации
 */

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, onChange, ...props },
  ref,
) {

  const store = useRadioStore()

  if (store.onChange) {
    onChange = store.onChange
  }

  return (
    <label className={styles.container}>
      <input type="radio" ref={ref} onChange={onChange} {...props}/>
      {label && <p>{label}</p>}
    </label>
  )
})

export default Radio
