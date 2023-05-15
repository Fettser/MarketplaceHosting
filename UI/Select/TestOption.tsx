import { Dispatch, FC, SetStateAction, MouseEventHandler, KeyboardEventHandler } from 'react'
import classNames from 'classnames/bind'
import styles from './TestSelect.module.scss'

export interface TestOptionProps {
  id?: number | string
  title: string
  value: string | number
  checked?: boolean
  disabled?: boolean
  focus?: boolean
  onChange?: ((value: string | number) => void) | Dispatch<SetStateAction<string | number>>
  onHover?: () => void
  onMouseEnter?: () => void
}

const cx = classNames.bind(styles)

const TestOption: FC<TestOptionProps> = (
  {
    focus,
    checked,
    value,
    title,
    onChange = () => null,
    disabled = false,
    onMouseEnter = () => null
  },
) => {

  const classes = cx({
    option: true,
    focus,
    disabled,
    checked,
  })

  return (
    <li className={classes} onMouseEnter={onMouseEnter} onClick={() => onChange(value)}>
      {title}
    </li>
  )
}

export default TestOption