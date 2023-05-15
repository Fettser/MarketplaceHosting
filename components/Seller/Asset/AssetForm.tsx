import styles from './Asset.module.scss'
import Step from './Step'
import Input from '../../../UI/Input/Input'
import Textarea from '../../../UI/Input/Textarea'
import { ChangeEvent, useEffect, useId, useRef, useState } from 'react'
import Button from '../../../UI/Button/Button'
import Image from 'next/image'
import Claws from '../../../public/claws.svg'
import { ClassScope } from '@typescript-eslint/utils/dist/ts-eslint-scope'
import Checkbox from '../../../UI/Input/Checkbox'
import Radio from '../../../UI/Input/Radio'
import PreviewCard from '../../Card/PreviewCard'
import MultiSelect, { MultiSelectRef } from '../../../UI/Select/MultiSelect'
import { useForm } from '../../../hooks/useForm'
import RadioGroup from '../../../UI/Input/RadioGroup'
import CheckboxGroup from '../../../UI/Input/CheckboxGroup'

type Option = {
  id: number
  title: string
  value: string
}

const options: Option[] = [
  {id: 1, title: 'Стилизованный', value: 'stylized'},
  {id: 2, title: 'Когти', value: 'claws'},
  {id: 3, title: 'Прелоадер', value: 'preloader'},
  {id: 4, title: 'Медведь', value: 'bear'},
  {id: 5, title: 'Минимализм', value: 'minimalism'},
  {id: 6, title: 'Пропсы', value: 'props'},
  {id: 7, title: 'Персонаж', value: 'character'},
  {id: 8, title: 'Локация', value: 'location'},
  {id: 9, title: 'Звук', value: 'audio'},
]

const promiseFetcher = async (search: string): Promise<Option[]> => {
  return new Promise<Option[]>((resolve) => {
    setTimeout(() => {
      resolve(options.filter(item => item.title.toLowerCase().includes(search.toLowerCase())))
    }, 1000)
  })
}

const AssetForm = () => {
  const fileId = useId()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [price, setPrice] = useState<string>('with')

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]?.size <= 1048576) {
      setFile(e.target.files[0])
    }
  }

  const { handleSubmit, register } = useForm((data) => console.log(data))

  // useEffect(() => {
  //   if (file) {
  //     const objectURL = URL.createObjectURL(file)
  //     setPreview(objectURL)
  //
  //     return () => URL.revokeObjectURL(objectURL)
  //   } else {
  //     setPreview(null)
  //   }
  // }, [file])

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Step step={1} stepName='Название и описание'>
        <div className={styles.step1}>
          <div className={styles.name}>
            <h4>Название:</h4>
            <Input placeholder={'Введите название'} {...register('assetName')}/>
          </div>
          <div className={styles.description}>
            <div className={styles.desc_text}>
              <h4>Название на русском:</h4>
              <Textarea placeholder={'Введите описание на русском'} {...register('rusDescription')}/>
            </div>
            <div className={styles.desc_text}>
              <h4>Название на английском:</h4>
              <Textarea placeholder={'Введите описание на английском'} {...register('engDescription')}/>
            </div>
          </div>
        </div>
      </Step>
      <Step step={2} stepName='Загрузка ассета'>
        <div className={styles.step2}>
          <p>1 архив (ZIP, RAR, 7Z)<br />Размер до 1 ГБ</p>
          <Button as='label' htmlFor={fileId} variant={'outlined'}>Загрузить</Button>
          <input onChange={handleFile} hidden id={fileId} type='file' />
          {file && <p>{file.name} ({(file.size / 1048576).toFixed(2)} Гб)</p>}
        </div>
      </Step>
      <Step step={3} stepName='Картинки для карточки'>
        <div className={styles.step3}>
          <div className={styles.preview}>
            <h4>Главная картинка:</h4>
            <div className={styles.step2}>
              <p>3×2, горизонтально<br />1 файл</p>
              <Button as='label' variant={'outlined'}>
                Загрузить
                <input hidden type='file' accept='image/png, image/jpeg, image/jpg' />
              </Button>
            </div>
          </div>
          <div className={styles.addition}>
            <h4>Дополнительные фото/видео:</h4>
            <div className={styles.step2}>
              <p>3×2, горизонтально<br />6 файлов</p>
              <Button as='label' variant={'outlined'}>
                Загрузить
                <input hidden type='file' accept='image/png, image/jpeg, image/jpg' />
              </Button>
            </div>
          </div>
        </div>
      </Step>
      <Step step={4} stepName='Категории'>
        <div className={styles.step4}>
          <div className={styles.categories}>
            <div className={styles.category}>
              <h4>Категории</h4>
              <div className={styles.wrapper}>
                <CheckboxGroup {...register('categories')}>
                  <Checkbox asButton={true} label={'2D'} value={'2d'}/>
                  <Checkbox asButton={true} label={'3D'} value={'3d'}/>
                  <Checkbox asButton={true} label={'VFX'} value={'vfx'}/>
                  <Checkbox asButton={true} label={'Audio'} value={'audio'}/>
                  <Checkbox asButton={true} label={'Текстуры'} value={'textures'}/>
                  <Checkbox asButton={true} label={'Анимация'} value={'animation'}/>
                  <Checkbox asButton={true} label={'Персонажи'} value={'character'}/>
                  <Checkbox asButton={true} label={'Blueprint'} value={'blueprint'}/>
                </CheckboxGroup>
              </div>
            </div>
            <div className={styles.category}>
              <h4>Движки</h4>
              <div className={styles.wrapper}>
                <CheckboxGroup {...register('engines')}>
                  <Checkbox asButton={true} label={'Unreal Engine 5.0'} value={'ue5'}/>
                  <Checkbox asButton={true} label={'Unreal Engine 4.0'} value={'ue4'}/>
                  <Checkbox asButton={true} label={'Stride 4.1'} value={'stride41'}/>
                </CheckboxGroup>
              </div>
            </div>
          </div>
          <div className={styles.tags}>
            <h4>Тэги</h4>
            <MultiSelect fetcher={promiseFetcher} {...register('tags')}/>
          </div>
        </div>
      </Step>
      <Step step={5} stepName='Цена'>
        <div className={styles.step5}>
          <div style={{display: 'flex', gap: 20}}>
            <Radio label={'Платный ассет'} value={'with'} onChange={e => setPrice(e.target.value)} checked={price === 'with'}/>
            <Radio label={'Бесплатный ассет'} value={'without'} onChange={e => setPrice(e.target.value)} checked={price === 'without'}/>
          </div>
          <Input hidden={price === 'without'} {...register('price')} placeholder={'Цена'} rightImage={true} iconUrl={'/currency.svg'}/>
        </div>
      </Step>
      <Button as={'button'} type={'submit'}>Submit</Button>
    </form>
  )
}

export default AssetForm