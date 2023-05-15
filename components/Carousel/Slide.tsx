import { AnimatePresence, motion, Variants } from 'framer-motion'
import { FC } from 'react'
import styles from './Carousel.module.scss'
import Arrow from '../../public/arrow.svg'
import Button from '../../UI/Button/Button'

export interface SlideProps {
  src: string
  direction: number
  clickHandle: (direction: number) => void
}

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 'calc(100% + 20px)' : 'calc(-100% - 20px)',
      transition: {
        duration: 0.5,
      },
    }
  },
  center: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 'calc(100% + 20px)' : 'calc(-100% - 20px)',
      transition: {
        duration: 0.5,
      },
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

/**
 * Компонент отображения выбранного фото/видео
 * param src - ссылка на текущее фото/видео
 * param direction - направление движения курсора (для адаптации под мобильные устройства)
 * param clickHandle - обработчик события нажатия на кнопки управления
 */

const Slide: FC<SlideProps> = ({ src, direction, clickHandle }) => {
  return (
    <div className={styles.slider}>
      <Button as="button" onClick={() => clickHandle(-1)}>
        <div style={{ rotate: '90deg' }}>
          <Arrow />
        </div>
      </Button>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className={styles.slide}
          key={src}
          variants={variants}
          initial="enter"
          custom={direction}
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              clickHandle(1)
            } else if (swipe > swipeConfidenceThreshold) {
              clickHandle(-1)
            }
          }}
        >
          <img src={src} alt={''} />
        </motion.div>
      </AnimatePresence>
      <Button as="button" onClick={() => clickHandle(1)}>
        <div style={{ rotate: '-90deg' }}>
          <Arrow />
        </div>
      </Button>
    </div>
  )
}

export default Slide
