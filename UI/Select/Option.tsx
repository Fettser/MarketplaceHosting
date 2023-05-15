import { FC } from 'react'
import styles from './Option.module.scss'

export type OptionProps = {
  value: any
  title: string
  checked?: boolean
  onChange: (value: any) => void
  disabled?: boolean
}

const Option: FC<OptionProps> = ({
  value,
  title,
  onChange,
  checked,
  disabled = false,
}) => {
  return (
    <li
      className={styles.option}
      onClick={() => onChange(value)}
      data-checked={checked}
      data-disabled={disabled}
    >
      {title}
    </li>
  )
}

export default Option
