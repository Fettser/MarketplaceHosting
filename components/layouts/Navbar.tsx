import ThemeToggle from './ThemeToggle'
import styles from './Navbar.module.scss'
import Basket from '../../public/basket.svg'
import Heart from '../../public/heart.svg'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import ProfileMenu from './ProfileMenu'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * компонент понели навигации
 */

const Navbar = () => {
  const router = useRouter()
  const isSeller = router.pathname.split('/')[1] === 'seller'
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href={'/'}>
          <h1 className={styles.logo}>Маркетплейс Ассетов</h1>
        </Link>
        <Input
          className={styles.search}
          iconUrl="/search.svg"
          placeholder="Поиск"
        />
        <div className={styles.navigation}>
          <ThemeToggle />
          {isSeller
            ?
            <Button as={Link} href={'/'} variant={'outlined'} style={{height: 30, alignSelf: 'center'}}>
              Вернуться на маркетплейс
            </Button>
            :
            <>
              <Button className={styles.item} animation="color">
                <Heart />
              </Button>
              <Button className={styles.item} animation="color">
                <Basket />
              </Button>
            </>}
          <ProfileMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
