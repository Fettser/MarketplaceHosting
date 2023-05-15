import styles from './PreviewCard.module.scss'
import Button from '../../UI/Button/Button'
import Heart from '../../public/heart.svg'
import Basket from '../../public/basket.svg'
import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import {parseCookies} from 'nookies'
import { useAlert } from '../Alert/AlertProvider'

export interface PreviewCardProps {
  id: number
  name: string
  author?: string
  category: string
  price: number
  image: string
  species: string
  minify?: boolean
}

/**
 * Превью карточка ассета в каталоге
 * param name - название
 * param category - категория
 * param price - цена
 * param image - фото
 * param id - ID ассета
 * param minify - флаг минифицированного отображения
 * param author - имя автора ассета
 */

const PreviewCard: FC<PreviewCardProps> = ({
  name,
  author,
  category,
  price,
  species,
  image,
  id,
  minify = false,
}) => {
  const router = useRouter()
  const alert = useAlert()

  const clickHandle = () => {
    router.push(`catalog/${id}`)
  }

  const onLikeHandle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const cookies = parseCookies()

    const accessToken = cookies['accessToken']

    if (accessToken) {
      const response = await fetch('http://localhost:5000/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        method: 'GET'
      })

      if (!response.ok) {
        console.error(response.statusText)
        alert.open && alert.open({text: 'Произошла ошибка', instance: 'error'})
      }

      const data = await response.json()

      console.log(data)
      alert.open && alert.open({text: 'Ассет добавлен в избранное', instance: 'success'})
    } else {
      alert.open && alert.open({text: 'Необходима авторизация', instance: 'pending'})
    }
  }

  const buyHandle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    console.log('buy')
  }

  return (
    <div className={styles.container} onClick={clickHandle}>
      <div className={styles.top_buttons}>
        <div className={styles.category}>
          <p>{category}</p>
        </div>
        <Button as="button" className={styles.like} onClick={onLikeHandle}>
          <Heart />
        </Button>
      </div>
      <div className={styles.preview_image}>
        <Image src={image} fill alt=""></Image>
      </div>
      <div className={styles.description}>
        <p className={styles.author}>{species}</p>
        <p className={styles.name}>{name}</p>
      </div>
      {!minify && (
        <div className={styles.bord}>
          <p className={styles.price}>{price} руб</p>
          <Button
            as="button"
            animation="scale"
            variant="contained"
            onClick={buyHandle}
          >
            <Basket />
            <p className={styles.text}>Купить</p>
          </Button>
        </div>
      )}
    </div>
  )
}

export default PreviewCard
