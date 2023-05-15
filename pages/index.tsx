import Category from '../components/Category'
import Discount from '../components/Discount'
import Button from '../UI/Button/Button'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import TestSelect from '../UI/Select/TestSelect'
import { useState } from 'react'
import { valid } from 'semver'

export default function Home() {
  const [state, setState] = useState<string | number>('two')
  return (
    <div className={styles.container}>
      <div className={styles.landing}>
        <h1 className={styles.heading}>Маркетплейс Ассетов</h1>
        <p>
          Будьте хитры, как медведь в своей берлоге, найдите самые ценные ассеты
          на нашей площадке!
        </p>

        <Button
          as={Link}
          variant='contained'
          size='medium'
          animation='scale'
          className={styles.button}
          href={'/catalog?page=1&count=24'}
        >
          В каталог
        </Button>
      </div>
      <div className={styles.discounts}>
        <div className={styles.grey_container}>
          <Discount
            title='Game ready современный вертолет'
            type='grey'
            description='Готовая к игре 3D-модель вертолета с детализированным интерьером, созданная на основе концепт-арта.'
          />
          <Discount
            title='Ассеты для Claw Engine'
            type='grey'
            description='Готовые решения для игровго движка "Claw Engine" - собственной разработки от Bear Head Studio'
          />

          <Discount
            title='3D ассеты от BHS'
            type='green'
            description='Готовое решение для вашего проекта от инди-студия по разработке игр Bear Head Studio.'
          />
        </div>
      </div>
      <div className={styles.categories_wrapper}>
        <h1>Категории</h1>
        <div className={styles.categories}>
          <Category name='2D' href={'/catalog?page=1&count=12&category=2d'} />
          <Category name='3D' href={'/catalog?page=1&count=12&category=3d'} />
          <Category name='VFX' href={'/catalog?page=1&count=12&category=vfx'} />
          <Category name='Audio' href={'/catalog?page=1&count=12&category=audio'} />
          <Category name='Characters' href={'/catalog?page=1&count=12&category=characters'} />
        </div>
      </div>
    </div>
  )
}
