import { FC, ReactNode } from 'react'
import { useRouter } from 'next/router'
import styles from './Layout.module.scss'
import Button from '../../UI/Button/Button'
import Link from 'next/link'

interface ProfileLayoutProps {
  children: ReactNode
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Button
          as={Link}
          href={'/profile'}
          variant={router.pathname === '/profile' ? 'contained' : undefined}
        >
          Профиль
        </Button>
        <Button
          as={Link}
          href={'/profile/favorites?page=1&count=12'}
          variant={router.pathname === '/profile/favorites' ? 'contained' : undefined}
        >
          Избранные ассеты
        </Button>
        <Button
          as={Link}
          href={'/profile/purchased?page=1&count=12'}
          variant={router.pathname === '/profile/purchased' ? 'contained' : undefined}
        >
          Купленные ассеты
        </Button>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default ProfileLayout