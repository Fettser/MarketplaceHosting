import { FC } from 'react'
import styles from '../styles/Discount.module.scss'
import Button from '../UI/Button/Button'
import Grey_bear from '../public/grey_bear.svg'
import Green_bear from '../public/green_bear.svg'

export interface DiscountProps {
  title: string
  description: string
  type: 'grey' | 'green'
  link?: string
}

/**
 * Карточка специальных предложений
 * @param title - названия
 * @param description - описание предложения
 * @param type - тип стилизации карточки
 * @param link - ссылка на предложение
 */

const Discount: FC<DiscountProps> = ({ title, description, type, link }) => {
  const img = type === 'grey' ? <Grey_bear /> : <Green_bear />

  return (
    <div className={[styles.container, styles[type]].join(' ')}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button
        as="button"
        variant="outlined"
        animation="scale"
        size="medium"
        className={styles.button}
      >
        Подробнее
      </Button>
      <div className={styles.image_wrapper}>{img}</div>
    </div>
  )
}

export default Discount
