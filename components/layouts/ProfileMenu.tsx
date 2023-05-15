import styles from './Navbar.module.scss'
import Dropdown, { DropdownVariants } from '../../UI/Dropdown/Dropdown'
import Avatar from '../../public/avatar.svg'
import Button from '../../UI/Button/Button'
import Link from 'next/link'
import Image from 'next/image'
import {parseCookies} from 'nookies'
import { useEffect, useState } from 'react'

const variants: DropdownVariants = {
  visible: { boxShadow: '0 0 10px' },
  hidden: { boxShadow: '0 0 0' },
}

const ProfileMenu = () => {

  const [user, setUser] = useState('')
  const accessToken = parseCookies()['accessToken']

  useEffect(() => {
    if (accessToken) {
      setUser('Михаил')
    } else {
      setUser('')
    }
  }, [accessToken])

  return (
    <>
      <Button as={Link} href={'/profile'} className={styles.profile_link}>
        {user ? user : 'Профиль'}
      </Button>
      <Dropdown className={styles.profile_menu} variants={variants}>
        <Dropdown.Toggle className={[styles.item, styles.toggle].join(' ')}>
          {/*{status === 'authenticated' ? <Image style={{borderRadius: 10}} src={data?.user?.image as string} alt={''} width={20} height={20}/> : <Avatar/>}*/}
          {/*{status === 'authenticated' ? data?.user?.name : 'Профиль'}*/}
          <Avatar/>
          Профиль
        </Dropdown.Toggle>
        <Dropdown.Menu type="expandable">
          <Button animation="color" as={Link} href={'/profile'}>
            {user ? 'Мой профиль' : 'Войти'}
          </Button>
          {user && (
            <>
              <Button animation="color">
                Избранное
              </Button>
              <Button animation="color">
                Купленные
              </Button>
            </>
          )}
          <Button animation="color">
            Стать продавцом
          </Button>
          {/*<Button as={'button'} variant="error">*/}
          {/*  Войти*/}
          {/*</Button>*/}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default ProfileMenu
