import Button from '../../UI/Button/Button'
import Arrow from '../../public/arrow.svg'
import { FC, useState } from 'react'
import styles from './Paginator.module.scss'
import LineSelect from '../../UI/Select/LineSelect'
import { usePagination } from '../../hooks/usePagination'

export interface PaginatorProps {
  totalCount: number
  currentPage: number
  siblingCount: number
  onChange?: (value: number) => void
  pageSize?: number
}

/**
 * Компонент пагинатора
 * param {number} totalCount - полное количество ассетов на странице
 * param {(value: number) => void} onChange - слушатель события выбора страницы
 * param {number} pageSize - количество ассетов на странице
 * param {number} siblingCount - количество соседних элементов
 * param {number} currentPage - текущая страница
 */

const Paginator: FC<PaginatorProps> = (
  {
    totalCount = 1,
    onChange,
    pageSize = 1,
    siblingCount = 1,
    currentPage = 1,
  }) => {
  const [page, setPage] = useState<number>(currentPage)

  if (!onChange) {
    onChange = setPage
    currentPage = page
  }

  const clickHandle = (direction: number) => {
    onChange && onChange(currentPage + direction)
  }

  const paginationRange = usePagination(
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  )
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  return (
    <div className={styles.container}>
      <Button
        as='button'
        className={styles.handle}
        onClick={() => clickHandle(-1)}
        disabled={currentPage === 1}
      >
        <div style={{ rotate: '90deg' }}>
          <Arrow />
        </div>
      </Button>
      <div className={styles.paginator}>
        {paginationRange.map((item, index) => {
          if (typeof item === 'number') {
            return <Button key={index} className={styles.page} as={'button'} disabled={item === currentPage}
                           variant={item === currentPage ? 'contained' : undefined}
                           onClick={() => onChange && onChange(item)}>{item}</Button>
          }
          return <Button key={index} style={{ cursor: 'auto' }} className={styles.page} as={'button'}
                         disabled={true}>...</Button>
        })
        }
      </div>
      <Button
        as='button'
        className={styles.handle}
        onClick={() => clickHandle(1)}
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
      >
        <div style={{ rotate: '-90deg' }}>
          <Arrow />
        </div>
      </Button>
    </div>
  )
}

export default Paginator
