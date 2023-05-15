import { ReactNode, useContext, FC } from 'react'
import DropdownContext, { DropdownContextValue } from './DropdownContext'
import styles from '../../components/layouts/Navbar.module.scss'
import Button, { ButtonProps } from '../Button/Button'
import Arrow from '../../public/arrow.svg'
import { motion } from 'framer-motion'

export interface DropdownToggleProps extends
  ButtonProps<'button'> {
  children?: ReactNode
  arrow?: boolean
}

const DropdownToggle: FC<DropdownToggleProps> = ({
  children,
  className,
  arrow = false,
}) => {
  const { show, setShow } = useContext<DropdownContextValue>(DropdownContext)

  const variants = {
    hidden: { rotate: 0 },
    visible: { rotate: 180 },
  }

  const onClickHandler = () => {
    if (setShow) {
      setShow((prevState) => !prevState)
    }
  }

  return (
    <Button
      className={
        className ? [styles.toggle, className].join(' ') : styles.toggle
      }
      onClick={onClickHandler}
    >
      {children}
      {arrow && (
        <motion.div animate={show ? 'visible' : 'hidden'} variants={variants}>
          <Arrow />
        </motion.div>
      )}
    </Button>
  )
}

export default DropdownToggle
