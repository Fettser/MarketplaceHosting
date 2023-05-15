import { AnimatePresence, motion } from 'framer-motion'
import { useState, FC, useRef, memo } from 'react'
import Portal from '../Portal/Portal'
import { useTimeout } from '../../hooks/useTimeout'
import { inspect } from 'util'
import styles from './Alert.module.scss'
import classNames from 'classnames/bind'

export interface AlertProps {
  message: string
  status: 'error' | 'success' | 'pending'
  onClose: () => void
}

const cx = classNames.bind(styles)

/**
 * Компонент всплывающего окна
 * param {string} message - сообщение
 * param {() => void} onClose - функция закрытия модального окна
 * param {'error' | 'success' | 'pending'} status - статус
 */

const Alert:FC<AlertProps> = ({message, onClose, status}) => {

  useTimeout(onClose, 3000)

  const classes = cx({
    alert: true,
    [styles[status]]: true,
  })

  return (
      <motion.div
        className={classes}
        initial={{x: '110%'}}
        animate={{x: 0}}
        exit={{x: '110%'}}
      >
        <p>{message}</p>
        <p style={{cursor: 'pointer', pointerEvents: 'auto'}} onClick={onClose}>&times;</p>
      </motion.div>
  )
}

export default Alert