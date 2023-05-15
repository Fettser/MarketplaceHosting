import styles from './Auth.module.scss'
import Input from '../../UI/Input/Input'
import Checkbox from '../../UI/Input/Checkbox'
import Button from '../../UI/Button/Button'
import { FormEvent, useRef } from 'react'
import { useForm } from '../../hooks/useForm'
import { setCookie } from 'nookies'
import { useRouter } from 'next/router'
import AlertProvider from '../../components/Alert/AlertProvider'
import LoginForm from '../../components/Auth/LoginForm'

const Auth = () => {

  return (
    <LoginForm/>
  )
}

export default Auth