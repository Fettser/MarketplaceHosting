import { FC, useState, Children, ReactElement, ReactNode } from 'react'
import styles from './InputGroup.module.scss'
import { motion, AnimatePresence } from 'framer-motion'

export type InputGroupProps = {
  children: ReactNode
  preview?: number
  name?: string
}

const InputGroup: FC<InputGroupProps> = ({ children, name, preview = 3 }) => {
  const [expand, setExpand] = useState<boolean>(false)
  const childrenArray = Children.toArray(children)

  return (
    <motion.div className={styles.container}>
      {name && <p>{name}</p>}
      <motion.div className={styles.items}>
        {Children.map(childrenArray.slice(0, preview), (child) => {
          return child
        })}
        <AnimatePresence>
          {expand && (
            <motion.div
              className={styles.items}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
            >
              {Children.map(childrenArray.slice(preview), (child) => {
                return child
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {preview < childrenArray.length && (
        <p
          onClick={() => setExpand((prevState) => !prevState)}
          style={{ fontSize: 14, color: 'gray', cursor: 'pointer' }}
        >
          {expand ? 'Скрыть' : 'Показать все...'}
        </p>
      )}
    </motion.div>
  )
}

export default InputGroup
