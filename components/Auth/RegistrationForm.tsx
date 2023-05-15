import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { useAlert } from '../Alert/AlertProvider'
import styles from '../../pages/auth/Auth.module.scss'
import Input from '../../UI/Input/Input'
import Checkbox from '../../UI/Input/Checkbox'
import Button from '../../UI/Button/Button'
import { setCookie } from 'nookies'


const RegistrationForm = () => {
  const router = useRouter()

  const nicknameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const alert = useAlert()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (confirmPasswordRef.current?.value !== passwordRef.current?.value) {
        alert.open && alert.open({text: 'Пароли не совпадают', instance: 'error'})
        return
      }
      const response = await fetch('http://84.201.137.99/api/users/', {
        method: 'POST',
        body: JSON.stringify({
          nickname: nicknameRef.current?.value,
          password: passwordRef.current?.value
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        console.log(response.status)
        throw new Error(response.statusText)
      }

      const data = await response.json()
      console.log(data)

      if (!data.token) {
        throw new Error('Token is empty')
      }

      setCookie(null, 'accessToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })

      router.push('/profile')

    } catch (e) {
      alert.open && alert.open({text: 'Произошла ошибка', instance: 'error'})
      console.error(e)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <Input ref={nicknameRef} name={'email'} placeholder={'Никнейм'}/>
        <Input ref={passwordRef} name={'password'} placeholder={'Пароль'} type={'password'}/>
        <Input ref={confirmPasswordRef} name={'confirm'} placeholder={'Пароль'} type={'password'}/>
        <Button variant={'contained'} style={{width: '100%'}}>Зарегистрироваться</Button>
      </form>
    </div>
  )
}

export default RegistrationForm