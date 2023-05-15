import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  FC,
  forwardRef,
  useImperativeHandle,
} from 'react'
import Input from '../Input/Input'
import useSWR from 'swr/immutable'
import { debounce } from '../../utils/debounce'
import styles from './MultiSelect.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../Button/Button'
import Arrow from '../../public/arrow.svg'
import Option from './Option'

const arrowVariants = {
  hidden: { rotate: 0 },
  visible: { rotate: 180 },
}

const listVariants = {
  hidden: { height: 0 },
  visible: { height: 'auto' },
}

type OptionValue = {
  id: number | string
  title: string
  value: string | number
  [key: string]: string | number | boolean
}

export interface MultiSelectProps {
  fetcher: (search: string) => Promise<OptionValue[]>
  selectedValues?: OptionValue[]
  name?: string
}

export interface MultiSelectRef {
  value: (string | number)[]
}

/**
 * Компонент асинхронного выбора нескольких значений с поддержкой поиска
 * @param {(search: string) => Promise<OptionValue[]>} fetcher - функция выполняющая запросы опций
 * @param {OptionValue[]} selectedValues - выбранные значения
 * @param {string} name - название группы
 */

const MultiSelect = forwardRef<MultiSelectRef, MultiSelectProps>(function MultiSelect(
  {
    fetcher,
    selectedValues: externalSelectedValues,
    name,
  }, ref)
{
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<OptionValue[]>([])

  useImperativeHandle(ref, () => ({
    value: selectedValues.map(item => item.value),
    name: name,
    checkValidity: (): boolean => !!selectedValues.length
  }), [selectedValues, name])

  const optionHandle = (value: OptionValue) => {
    if (selectedValues.find(item => item.value === value.value) === undefined) {
      setSelectedValues(prevState => ([...prevState, value]))
    }
  }

  const deleteItem = (value: OptionValue) => {
    setSelectedValues(prevState => prevState.filter(item => item.value !== value.value))
  }

  const {
    data,
    error,
  } = useSWR([searchQuery], ([searchQuery]) => fetcher(searchQuery))

  const changeHandle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const debouncedHandle = useMemo(() => {
    return debounce(changeHandle, 500)
  }, [changeHandle])

  return (
    <div className={styles.container}>
      {selectedValues.length > 0 && <div className={styles.selected}>
        {selectedValues.map(item => (
          <div key={item.id} className={styles.item}>
            <p>{item.title}</p>
            <p style={{ cursor: 'pointer' }} onClick={() => deleteItem(item)}>✖</p>
          </div>
        ))}
      </div>}
      <div className={styles.dropdown}>
        <div className={styles.controller}>
          <Input placeholder={'Выберите значение...'} onChange={debouncedHandle} onClick={() => setOpen(true)} />
          <div className={styles.arrow} onClick={() => setOpen(prevState => !prevState)}>
            <motion.div
              animate={open ? 'visible' : 'hidden'}
              variants={arrowVariants}
            >
              <Arrow />
            </motion.div>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.ul
              variants={listVariants}
              initial={'hidden'}
              animate={'visible'}
              exit={'hidden'}
              className={styles.menu}>
              {data && (
                data.map((item: OptionValue) => (
                  <Option key={item.id} onChange={optionHandle} value={item} title={item.title} />
                ))
              )}
              {data && data?.length === 0 && <div>Нет совпадений</div>}
              {!data && !error && <div>Загрезка...</div>}
              {error && <div style={{ backgroundColor: '#ffacac' }}>Ошибка</div>}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
)

export default MultiSelect