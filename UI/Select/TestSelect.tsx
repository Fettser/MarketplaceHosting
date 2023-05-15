import styles from './TestSelect.module.scss'
import { Dispatch, SetStateAction, useState, FC, useRef, useEffect, useCallback, KeyboardEvent, useMemo } from 'react'
import TestOption from './TestOption'
import Button from '../Button/Button'
import Arrow from '../../public/arrow.svg'
import { motion, AnimatePresence } from 'framer-motion'

type OptionType = {
  id: number
  title: string
  value: string | number
  disabled?: boolean
  focused?: boolean
}

export interface TestSelectProps {
  options: OptionType[]
  value?: string | number
  onChange?: ((value: string | number) => void) | Dispatch<SetStateAction<string | number>>
  placeholder?: string
  defaultValue?: string | number
}

const arrowVariants = {
  hidden: { rotate: 0 },
  visible: { rotate: 180 },
}

const listVariants = {
  hidden: { height: 0 },
  visible: { height: 'auto' }
}

const TestSelect: FC<TestSelectProps> = (
  {
    options,
    value: externalValue,
    defaultValue,
    placeholder = 'Выберите значение...',
    onChange: externalOnChange,
  }) => {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue || '')

  const value = externalValue === undefined ? internalValue : externalValue

  const [focus, setFocus] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const controlRef = useRef<HTMLButtonElement>(null)

  const availableIndexes = useMemo(() => {
    return options.reduce<Array<number>>((result, item, index) => {
        if (!item.disabled) {
          result.push(index)
        }

      return result
    }, [])
  }, [options])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        setFocus(-1)
      }
    }

    if (open) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.focus()
    } else if (!open && controlRef.current) {
      controlRef.current.focus()
      setFocus(-1)
    }
  }, [open])

  const onChange = useCallback((value: string | number | undefined) => {
    if (externalOnChange) {
      value && externalOnChange(value)
    }

    if (externalValue === undefined) {
      value && setInternalValue(value)
    }
    setOpen(false)
    setFocus(-1)
  }, [externalOnChange, externalValue])

  const keyDownHandle = (e: KeyboardEvent<HTMLUListElement>) => {
    e.preventDefault()
    e.stopPropagation()
    switch (e.code) {
      case 'ArrowDown':
        setFocus(prevState => prevState === availableIndexes.length - 1 ? 0 : prevState + 1)
        break
      case 'ArrowUp':
        setFocus(prevState => prevState <= 0 ? availableIndexes.length - 1 : prevState - 1)
        break
      case 'Enter':
        onChange(options[availableIndexes[focus]]?.value)
        break
      case 'Escape':
        setOpen(false)
        setFocus(-1)
        break
    }
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <Button
        as='button'
        className={styles.control}
        onClick={() => setOpen(prevState => !prevState)}
        ref={controlRef}
      >
        {(options && options.find((item) => item.value === value)?.title) || placeholder}
        <motion.div
          animate={open ? 'visible' : 'hidden'}
          variants={arrowVariants}
        >
          <Arrow />
        </motion.div>
      </Button>
      <AnimatePresence>
        {open && (
          <motion.ul
            onKeyDown={keyDownHandle}
            tabIndex={0}
            ref={listRef}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={listVariants}
            className={styles.menu}
          >
            {options.map((item, index) => (
              <TestOption
                key={item.id} checked={item.value === value} title={item.title} value={item.value}
                focus={availableIndexes[focus] === index}
                onChange={onChange}
                disabled={item.disabled}
                onMouseEnter={() => {
                  const idx = availableIndexes.indexOf(index)
                  if (idx > -1) {
                    setFocus(idx)
                  }
                }}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TestSelect