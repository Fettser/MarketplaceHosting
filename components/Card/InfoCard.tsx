import styles from './InfoCard.module.scss'
import Button from '../../UI/Button/Button'
import Basket from '../../public/basket.svg'
import Heart from '../../public/heart.svg'
import { FC } from 'react'

export interface InfoCardProps {
  id: number
  name: string
  author: string
  categories?: Array<string>
  platforms?: Array<string>
  price: number
  date: string
  size?: number
}

/**
 * Информационная карточка ассета
 * param id - ID ассета
 * param date - дата публикации
 * param platforms - поддерживаемые платформы
 * param price - цена
 * param size - размер файла
 * param name - название
 * param author - автор
 * param categories - категории
 */

const InfoCard = () => {
  return (
    <div className={styles.container}>
      <Button className={styles.like} size={'small'}>
        <Heart />
      </Button>
      <table>
        <tbody>
        <tr>
          <td>Автор:</td>
          <td>DEKOGON STUDIOS</td>
        </tr>
        <tr>
          <td>Дата публикации:</td>
          <td>21.12.2022</td>
        </tr>
        <tr>
          <td>Размер файла:</td>
          <td>100 МБ</td>
        </tr>
        <tr>
          <td>Версии движка:</td>
          <td>Unreal Engine, Unity</td>
        </tr>
        <tr>
          <td>Платформы:</td>
          <td>Windows, Linux</td>
        </tr>
        </tbody>
      </table>
      <div className={styles.buy}>
        <h3 className={styles.price}>1990 руб</h3>
        <Button as='button' animation='scale' variant='contained'>
          <Basket />
          <p className={styles.text}>В корзину</p>
        </Button>
      </div>
    </div>
  )
}

export default InfoCard
