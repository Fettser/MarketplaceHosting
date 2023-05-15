import { GetServerSideProps } from 'next'
import nookies, { destroyCookie, parseCookies } from 'nookies'
import ProfileCard from '../../components/Seller/Card/ProfileCard'
import Button from '../../UI/Button/Button'
import { useRouter } from 'next/router'
import ProfileLayout from './layout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import useSWR from 'swr'

interface ProfilePageProps {
  message: string
}

const getUser = (accessToken: string) => {
  console.log(accessToken)
  return fetch('http://84.201.137.99/api/profile/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  }).then((res) => res.json()).catch(e => e)
}

const updateUser = (accessToken: string, body: { [key: string]: any }) => {
  console.log(body)
  return fetch('http://84.201.137.99/api/profile/', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json()).catch(e => e)
}

const Profile: NextPageWithLayout<ProfilePageProps> = ({message }) => {

  const router = useRouter()
  const cookies = parseCookies()

  const { data, isLoading, error, mutate } = useSWR(cookies['accessToken'], getUser)

  if (message === 'Unauthorized' || message === 'Internal server error') {
    return <div>{message}</div>
  }

  const logout = () => {
    destroyCookie(null, 'accessToken', {
      path: '/',
    })
    router.push('/auth')
  }

  const onEdit = async (value: { [key: string]: any }) => {
    const cookies = parseCookies()
    const token = cookies['accessToken']
    try {
      await updateUser(token, value)
      mutate()
    } catch (e) {
      console.log(e)
    }
  }

  if (!data) {
    return <div><img src={'/animatedClaws.svg'}/></div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
      <ProfileCard onEdit={onEdit} fields={[
        { id: 1, name: 'nickname', title: 'Никнейм', value: data.nickname, isEditable: false },
        { id: 3, name: 'fio', value: data.fio, title: 'Имя, фамилия, отчество' },
        { id: 2, name: 'about_user', value: data.about_user, title: 'О себе' },
        { id: 4, name: 'birthday', value: data.birthday, title: 'Дата рождения' },
      ]} image={'/bearAvatar.png'} />
      <div style={{ display: 'flex', gap: 20 }}>
        <Button as='button' variant={'outlined'} style={{ width: 180 }}>Изменить пароль</Button>
        <Button as='button' variant={'error'} style={{ width: 180 }} onClick={logout}>Выйти</Button>
      </div>
    </div>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <ProfileLayout>
      {page}
    </ProfileLayout>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (context) => {

  const cookies = nookies.get(context)

  const accessToken = cookies['accessToken']

  if (accessToken) {
    const response = await fetch('http://84.201.137.99/api/profile', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      method: 'GET',
    })

    if (!response.ok) {
      return {
        props: {
          data: [],
          message: 'Internal server error',
        },
      }
    }

    return {
      props: {
        message: 'success',
      },
    }
  } else {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
}
