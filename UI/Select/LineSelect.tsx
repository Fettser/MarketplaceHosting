import { FC, useState } from 'react'
import styles from './Select.module.scss'
import Option from './Option'
import { SelectProps } from './Select'

export type LineSelectProps = Omit<
  SelectProps,
  'placeholder' | 'variants' | 'type'
>

const LineSelect: FC<LineSelectProps> = ({
  options,
  value: externalValue,
  onChange: externalOnChange,
  className,
  defaultValue
}) => {
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue || '')

  const onChange = (value: string | number) => {
    if (externalOnChange) {
      externalOnChange(value)
    }

    if (externalValue === undefined) {
      setInternalValue(value)
    }
  }

  const value = externalValue === undefined ? internalValue : externalValue

  return (
    <div className={[styles.line, className].join(' ')}>
      {options &&
        options.map((option) => (
          <Option
            value={option.value}
            title={option.title}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={onChange}
            key={option.id}
          />
        ))}
    </div>
  )
}

export default LineSelect
