import styles from './Carousel.module.scss'
import Slide from './Slide'
import Bar from './Bar'
import { useState } from 'react'

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Moench_2339.jpg/1200px-Moench_2339.jpg',
  'https://n1s1.hsmedia.ru/69/70/69/697069b5882b8fcc6165c7180fd67656/728x590_1_864529f1c74d49610b9d6bfb19f0bb1b@5000x4051_0xac120003_19525361911673259411.jpeg',
  'https://www.russiadiscovery.ru/upload/files/files/Kavkazskie_gory.jpg',
  'https://www.rgo.ru/sites/default/files/node/32473/yuriy-ufimcev-fioletovyy-zakat-536530.jpg',
  'https://s0.rbk.ru/v6_top_pics/media/img/0/75/756569399522750.jpg',
]

/**
 * Компонент отображения фото/видео
 */

const Carousel = () => {
  const [[position, direction, offset], setPosition] = useState([0, 0, 0])
  const clickHandle = (direction: number) => {
    if (
      (position > 0 && position < images.length - 1) ||
      (position === 0 && direction > 0) ||
      (position === images.length - 1 && direction < 0)
    ) {
      const newOffset =
        direction > 0
          ? offset + 3 === position
            ? offset + 1
            : offset
          : offset === position
          ? offset - 1
          : offset
      setPosition((prevState) => [
        prevState[0] + direction,
        direction,
        newOffset,
      ])
    }
  }
  const changeHandle = (pos: number) => {
    const newDirection = pos > position ? 1 : -1
    setPosition((prevState) => [pos, newDirection, prevState[2]])
  }
  return (
    <div className={styles.container}>
      <Slide
        src={images[position]}
        direction={direction}
        clickHandle={clickHandle}
      />
      <Bar
        position={position}
        changeHandle={changeHandle}
        clickHandle={clickHandle}
        images={images}
        offset={offset}
      />
    </div>
  )
}

export default Carousel
