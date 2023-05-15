import styles from './Carousel.module.scss'
import { motion } from 'framer-motion'
import Button from '../../UI/Button/Button'
import { FC } from 'react'
import Arrow from '../../public/arrow.svg'

export interface BarProps {
  position: number
  changeHandle: (direction: number) => void
  clickHandle: (position: number) => void
  images: Array<string>
  offset: number
}

/**
 * Компонент управления фото/видео
 * param position - выбранный элемент
 * param changeHandle - слушатель события на выбор фото/видео
 * param clickHandle - слушатель события на переключение фото/видео с помощью кнопок
 * param images - отображаемые материалы
 * param offset - смещение положения списка отображаемых превью фото/видео
 */

const Bar: FC<BarProps> = ({
  position,
  changeHandle,
  clickHandle,
  images,
  offset,
}) => {
  return (
    <div className={styles.bar}>
      <div className={styles.carousel_wrapper}>
        <Button as="button" onClick={() => clickHandle(-1)}>
          <div style={{ rotate: '90deg' }}>
            <Arrow />
          </div>
        </Button>
        <div className={styles.carousel}>
          {images.map((value, index) => {
            return (
              <motion.div
                key={index}
                className={styles.image}
                initial={false}
                animate={{
                  left: `-${offset * 25}%`,
                  transition: {
                    duration: 0.5,
                  },
                }}
              >
                <img
                  onClick={() => changeHandle(index)}
                  src={value}
                  alt={''}
                  style={
                    index === position ? { border: 'white 2px solid' } : {}
                  }
                />
              </motion.div>
            )
          })}
        </div>
        <Button as="button" onClick={() => clickHandle(1)}>
          <div style={{ rotate: '-90deg' }}>
            <Arrow />
          </div>
        </Button>
      </div>
      <div className={styles.dots}>
        {images.map((value, index) => (
          <div
            key={value}
            className={styles.dot}
            data-selected={index === position}
          />
        ))}
      </div>
    </div>
  )
}

export default Bar
