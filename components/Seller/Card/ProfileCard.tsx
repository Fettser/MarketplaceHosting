import styles from './ProfileCard.module.scss'
import Button from '../../../UI/Button/Button'
import { useRef, useState, FC, useEffect } from 'react'
import Image from 'next/image'
import Input from '../../../UI/Input/Input'

export interface Field {
  id: number
  name: string
  value: string | number
  isEditable?: boolean
  title?: string
  [key: string]: any
}

export interface ProfileCardProps {
  fields: Field[]
  image?: string
  onEdit?: (value: {[key: string]: any}) => Promise<any>
}

/**
 * Компонент карточки пользователя
 * param {Field[]} fields - поля с информацией о пользователе
 * param {string} image - ссылка на аватар пользователя
 * param {(value: {[key: string]: any}) => Promise<any>} onEdit - функция редактирования информации о пользователе
 */

const ProfileCard:FC<ProfileCardProps> = ({fields, image, onEdit}) => {
  const [isEdit, setIsEdit] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement>>([])

  const onConfirm = async () => {
    const body: {[key: string]: any} = {}
    inputRefs.current.forEach((item, index) => {
      if (item.value !== '') {
        body[fields[index].name] = item.value
      }
    })
    onEdit && await onEdit(body)
    setIsEdit(false)
  }

  const onCancel = () => {
    setIsEdit(false)
  }

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, fields.length)
  }, [fields.length])

  return (
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Общая информация</h2>
          <div className={styles.btns}>
            {isEdit ?
              <>
                <Button
                  as='button'
                  className={styles.confirm}
                  onClick={onConfirm}
                >
                  Подтвердить
                </Button>
                <Button
                  as='button'
                  variant={'error'}
                  onClick={onCancel}
                >
                  Отмена
                </Button>
              </> :
              <Button
                as='button'
                variant={'default'}
                onClick={() => setIsEdit(prevState => !prevState)}
              >
                Редактировать
              </Button>
            }
          </div>
        </div>
        <div className={styles.content}>
          {image && (
            <div className={styles.avatar}>
              <Image src={image} alt={''} fill />
            </div>
          )}
          <div className={styles.fields}>
            {fields.map((item: Field, index) => {
              const {id, value, title, isEditable = true, ...props} = item
              return (<div key={id} className={styles.field}>
                <h4>{title}:</h4>
                {isEdit && isEditable
                  ?
                  <>
                    <Input
                      ref={(node: HTMLInputElement) => {
                        inputRefs.current[index] = node
                      }}
                      defaultValue={value}
                      {...props}
                    />
                  </>
                  :
                  <p>{item.value ? item.value : 'Отредактировать'}</p>
                }
              </div>)
            })}
          </div>
        </div>
      </div>
  )
}

export default ProfileCard