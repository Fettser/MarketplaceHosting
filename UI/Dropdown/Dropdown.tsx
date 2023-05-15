import { motion, HTMLMotionProps, Variant } from 'framer-motion'
import { FC, ReactNode, useState } from 'react'
import styles from './Dropdown.module.scss'
import DropdownContext from './DropdownContext'
import DropdownToggle from './DropdownToggle'
import DropdownMenu from './DropdownMenu'

export type DropdownVariants = {
  visible: Variant
  hidden: Variant
}

export interface DropdownProps extends
  HTMLMotionProps<'div'> {
  children: ReactNode
  variants?: DropdownVariants
}

/**
 * Компонент раскрывающегося меню
 * @param {ReactNode} children - элементы меню
 * @param { string | undefined} className - класс
 * @param {DropdownProps} variants - варианты анимации
 * @param {[key: string]: any} rest - остальные пропсы
 */

const Dropdown: FC<DropdownProps> = ({
  children,
  className,
  variants,
  ...rest
}) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <DropdownContext.Provider value={{ show, setShow }}>
      <motion.div
        className={[styles.dropdown, className].join(' ')}
        variants={variants}
        animate={show ? 'visible' : 'hidden'}
        {...rest}
      >
        {children}
      </motion.div>
    </DropdownContext.Provider>
  )
}

export default Object.assign(Dropdown, {
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
})
