import { Dispatch, SetStateAction, FC, useState, useEffect, useRef } from 'react'
import styles from './Select.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import Arrow from '../../public/arrow.svg'
import { DropdownVariants } from '../Dropdown/Dropdown'
import Option from './Option'
import Button from '../Button/Button'

type OptionType = {
  id?: number | string
  title: string
  value: string | number
  disabled?: boolean
}

interface SelectOwnProps {
  options: OptionType[]
  onChange?: ((value: string | number) => void) | Dispatch<SetStateAction<string | number>>
  value?: string | number
  defaultValue?: string | number
}

const arrowVariants = {
  hidden: { rotate: 0 },
  visible: { rotate: 180 },
}

export interface SelectProps extends SelectOwnProps {
  placeholder?: string
  variants?: DropdownVariants
  className?: string
  type?: 'collapsible' | 'expandable'
  placement?: 'left' | 'center' | 'right'
}

/**
 * Компонент Select
 * @param {OptionType[]} options - опции
 * @param {string} placeholder - заглушка
 * @param {'collapsible' | 'expandable'} type - тип (выпадающий или раскрывающийся)
 * @param {string | number} defaultValue - значение по умолчанию
 * @param {'left' | 'center' | 'right'} placement - положение (для type='collapsible')
 */

const Select: FC<SelectProps> = (
  {
    options,
    // onChange: externalOnChange,
    placeholder = 'выбрать...',
    variants = {
      hidden: { height: 0 },
      visible: { height: 'auto' },
    },
    // type = 'collapsible',
    // className,
    defaultValue,
    // value: externalValue,
    placement= 'left'
  }) => {
  // const [open, setOpen] = useState<boolean>(false)
  // const [internalValue, setInternalValue] = useState<string | number>(defaultValue || '')
  //
  // const ref = useRef<HTMLDivElement>(null)
  //
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setOpen(false)
  //     }
  //   }
  //
  //   if (open) {
  //     document.addEventListener('click', handleClickOutside)
  //   }
  //
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside)
  //   }
  // }, [open])
  //
  // const onChange = (value: string | number) => {
  //   if (externalOnChange) {
  //     externalOnChange(value)
  //   }
  //
  //   if (externalValue === undefined) {
  //     setInternalValue(value)
  //   }
  // }
  //
  // const value = externalValue === undefined ? internalValue : externalValue

  // return (
  //   <div className={[styles.container, className].join(' ')} ref={ref}>
  //     <Button
  //       as='button'
  //       className={styles.toggle}
  //       onClick={() => setOpen((prevState) => !prevState)}
  //     >
  //       {(options && options.find((item) => item.value === value)?.title) ||
  //         placeholder}
  //       <motion.div
  //         animate={open ? 'visible' : 'hidden'}
  //         variants={arrowVariants}
  //       >
  //         <Arrow />
  //       </motion.div>
  //     </Button>
  //     <AnimatePresence>
  //       {open && (
  //         <motion.ul
  //           className={[styles.options, styles[type], styles[placement]].join(' ')}
  //           initial='hidden'
  //           animate='visible'
  //           exit='hidden'
  //           variants={variants}
  //         >
  //           {options &&
  //             options.map((option) => (
  //               <Option
  //                 value={option.value}
  //                 title={option.title}
  //                 checked={value === option.value}
  //                 onChange={onChange}
  //                 key={option.id}
  //               />
  //             ))}
  //         </motion.ul>
  //       )}
  //     </AnimatePresence>
  //   </div>
  // )

  return <div/>
}

export default Select
