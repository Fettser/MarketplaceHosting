import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { setCookie } from 'nookies'
import styles from '../../pages/auth/Auth.module.scss'
import Input from '../../UI/Input/Input'
import Checkbox from '../../UI/Input/Checkbox'
import Button from '../../UI/Button/Button'
import { useAlert } from '../Alert/AlertProvider'
import Link from 'next/link'


const LoginForm = () => {
  const router = useRouter()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const checkboxRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const alert = useAlert()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://84.201.137.99/api/users/login/', {
        method: 'POST',
        body: JSON.stringify({
          nickname: emailRef.current?.value,
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

      if (!data.access_token) {
        throw new Error('Token is empty')
      }

      setCookie(null, 'accessToken', data.access_token, {
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
        <Input ref={emailRef} name={'email'} placeholder={'Никнейм'}/>
        <Input ref={passwordRef} name={'password'} placeholder={'Пароль'} type={'password'}/>
        <Checkbox ref={checkboxRef} label={'Не выходить из системы'}/>
        <Button variant={'contained'} style={{width: '100%'}}>Войти</Button>
        <p>Забыли пароль?</p>
        <p>Еще нет аккаунта?
          <Link href={'/auth/registration'}>Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginForm