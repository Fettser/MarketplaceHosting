import Input from '../../UI/Input/Input'
import InputGroup from '../../UI/Input/InputGroup'
import Checkbox from '../../UI/Input/Checkbox'
import RangeInput from '../../UI/Input/RangeInput'
import { ChangeEvent, memo } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

function createQuery(query: ParsedUrlQuery, name: string, checked: boolean, value: string) {
  const group = query[name]
  if (typeof group === 'string') {
    if (checked) {
      return { ...query, [name]: [group, value] }
    } else {
      delete query[name]
      return { ...query }
    }
  } else if (Array.isArray(group)) {
    if (checked) {
      return { ...query, [name]: [...group, value] }
    } else {
      return { ...query, [name]: group.filter(item => item !== value) }
    }
  } else {
    if (checked) {
      return { ...query, [name]: value }
    }
    return query
  }
}

function getRouterParams(query: ParsedUrlQuery, name: string) {
  return query[name] || []
}

const categories = [
  { id: 1, title: '2D', value: '2d' },
  { id: 2, title: '3D', value: '3d' },
  { id: 3, title: 'VFX', value: 'vfx' },
  { id: 4, title: 'Audio', value: 'audio' },
  { id: 5, title: 'Characters', value: 'characters' },
]

const engines = [
  { id: 1, title: 'Unity', value: 'unity' },
  { id: 2, title: 'Unreal Engine 4', value: 'ue4' },
  { id: 3, title: 'Unreal Engine 5', value: 'ue5' },
  { id: 4, title: 'Source', value: 'source' },
  { id: 5, title: 'Source 2', value: 'source2' },
  { id: 6, title: 'REDengine', value: 'redengine' },
  { id: 7, title: 'REDengine 4', value: 'redengine4' },
]

const platforms = [
  { id: 1, title: 'IOS', value: 'ios' },
  { id: 2, title: 'Linux', value: 'linux' },
  { id: 3, title: 'Windows', value: 'windows' },
]

/**
 * Компонент фильтрации. Фильтрация выполняется путем добавления/удаления полей из строки запроса.
 * Компонент автоматически захватывает контекст текущего пути маршрута.
 */

const Filter = memo(function Filter() {
  const router = useRouter()

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = createQuery(router.query, e.target.name, e.target.checked, e.target.value)
    console.log(newQuery)
    router.push({
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <>
      <Input
        name={'search'}
        placeholder='Поиск ассетов'
        iconUrl='/search.svg'
      />
      <InputGroup name='Категории'>
        {categories.map(item => (
          <Checkbox
            key={item.id}
            name={'category'}
            onChange={onChangeCheckbox}
            value={item.value}
            label={item.title}
            checked={getRouterParams(router.query, 'category').includes(item.value)}
          />
        ))}
      </InputGroup>
      <InputGroup name='Движки'>
        {engines.map(item => (
          <Checkbox
            key={item.id}
            name={'engines'}
            onChange={onChangeCheckbox}
            value={item.value}
            label={item.title}
            checked={getRouterParams(router.query, 'engines').includes(item.value)}
          />
        ))}
      </InputGroup>
      <InputGroup name='Платформы'>
        {platforms.map(item => (
          <Checkbox
            key={item.id}
            name={'platforms'}
            onChange={onChangeCheckbox}
            value={item.value}
            label={item.title}
            checked={getRouterParams(router.query, 'platforms').includes(item.value)}
          />
        ))}
      </InputGroup>
      <RangeInput />
    </>
  )
})

export default Filter