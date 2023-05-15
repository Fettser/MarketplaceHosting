import { FC } from 'react'
import styles from './ReviewCard.module.scss'
import Star from '../../public/star.svg'
import Like from '../../public/like.svg'
import Dislike from '../../public/dislike.svg'
import Button from '../../UI/Button/Button'
import EmptyStar from '../../public/emptyStar.svg'

export interface ReviewCardProps {
  username: string
  stars: number
  review: string
  date: string
}

const getStars = (count: number) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= count) {
      stars.push(<Star key={i} />)
    } else {
      stars.push(<EmptyStar key={i} />)
    }
  }
  return stars
}

/**
 * Карточка отзыва об ассете
 * param username - имя пользователя
 * param review - содержание отзыва
 * param date - дата публикации
 * param stars - оценка
 */

const ReviewCard: FC<ReviewCardProps> = ({ username, review, date, stars }) => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>{username}</h4>
        <div className={styles.stars}>{getStars(stars)}</div>
      </div>
      <p>{review}</p>
      <div className={styles.footer}>
        <p>{date}</p>
        <div className={styles.actions}>
          <Button as="button">
            <Like />
          </Button>
          <Button as="button">
            <Dislike />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
