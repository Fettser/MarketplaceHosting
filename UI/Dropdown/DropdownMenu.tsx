import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { FC, ReactNode, useContext } from 'react'
import styles from './Dropdown.module.scss'
import DropdownContext, { DropdownContextValue } from './DropdownContext'
import classNames from 'classnames/bind'
import { DropdownVariants } from './Dropdown'

const cx = classNames.bind(styles)

export interface DropdownMenuProps extends
  HTMLMotionProps<'div'> {
  children: ReactNode
  type: 'collapsible' | 'expandable'
  placement?: 'left' | 'center' | 'right'
  variants?: DropdownVariants
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  children,
  className,
  type,
  placement,
  variants,
  ...rest
}) => {
  const { show } = useContext<DropdownContextValue>(DropdownContext)

  const classes = cx({
    menu: true,
    [styles[type]]: true,
    [styles[placement ? placement : 'right']]: !!placement,
  })

  variants =
    variants === undefined
      ? {
          hidden: { height: 0 },
          visible: { height: 'auto' },
        }
      : variants

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={[classes, className].join(' ')}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DropdownMenu
