import { ReactNode, FC} from 'react'
import Portal from '../Portal/Portal'
import { AnimatePresence, motion, PanInfo, useDragControls } from 'framer-motion'
import styles from './Modal.module.scss'

export interface ModalProps {
  children?: ReactNode
  open: boolean
  setOpen: () => void
}

/**
 * Компонент модельного окна
 * param children - отображаемый компонент
 * param open - флаг открытия/закрытия
 * param setOpen - функция изменения флага
 */

const Modal:FC<ModalProps> = ({children, open, setOpen}) => {
  const controls = useDragControls()

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.y
    const velocity = info.velocity.y

    if (offset > 200 || velocity > 300) {
      setOpen()
    }
  }

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.backdrop}
            initial={{ backgroundColor: 'rgba(0, 0, 0, .0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, .6)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, .0)' }}
          >
            <motion.div
              drag='y'
              onDragEnd={handleDragEnd}
              dragElastic={{ top: 0, bottom: 0.8 }}
              dragDirectionLock
              dragControls={controls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragListener={false}
              className={styles.modal}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
            >
              <motion.div
                onPointerDown={(e) => {
                  controls.start(e)
                }}
                className={styles.close}
                style={{touchAction: 'none'}}
              >
                <div className={styles.cursor}/>
              </motion.div>
              <div className={styles.content}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}

export default Modal