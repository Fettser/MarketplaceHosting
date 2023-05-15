import useSWR from 'swr'
import { useRouter } from 'next/router'
import styles from '../../pages/catalog/Catalog.module.scss'
import Paginator from '../Filter/Paginator'
import Select from '../../UI/Select/Select'
import PreviewCard, { PreviewCardProps } from '../Card/PreviewCard'
import FilterModal from '../Filter/FilterModal'
import dynamic from 'next/dynamic'
import TestSelect from '../../UI/Select/TestSelect'
import AnimatedClaws from '../../public/animatedClaws.svg'

const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json())
}

const DynamicModal = dynamic(() => import('../Filter/FilterModal'), {
  ssr: false
})

/**
 * Компонент отображения ассетов в каталоге
 */

const Assets = () => {
  const router = useRouter()

  const paginatorHandle = (value: number) => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: value },
      },
      undefined,
      { shallow: true },
    )
  }

  const sortHandle = (value: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, sortBy: value },
      },
      undefined,
      { shallow: true },
    )
  }

  const countPerPageHandle = (value: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          count: value,
          page: Math.min(
            Math.ceil(Number(data?.info?.count) / value),
            Number(router.query.page),
          ),
        },
      },
      undefined,
      { shallow: true },
    )
  }

  const { data } = useSWR(
    `https://rickandmortyapi.com/api/character/?page=${router.query.page}`,
    fetcher,
  )

  // передавать фетчер через пропсы и прокидывать данные

  return (
    <div className={styles.content}>
      <div className={styles.filters}>
        <DynamicModal/>
        <TestSelect
          options={[
            { id: 1, title: 'сначала новые', value: 'new' },
            { id: 2, title: 'сначала старые', value: 'old' },
            { id: 3, title: 'сначала дешевые', value: 'cheap' },
            { id: 4, title: 'сначала дорогие', value: 'expensive' },
            { id: 5, title: 'по алфавиту', value: 'alpha' },
            { id: 6, title: 'не сортировать', value: 'none' },
          ]}
          value={(router.query.sortBy as string) || 'none'}
          // @ts-ignore
          onChange={sortHandle}
        />
        <TestSelect
          options={[
            { id: 1, title: '12', value: 12 },
            { id: 2, title: '24', value: 24 },
            { id: 3, title: '48', value: 48 },
          ]}
          value={Number(router.query.count) || 12}
          // @ts-ignore
          onChange={countPerPageHandle}
        />
      </div>
      {!data ? (
        <>
          <div style={{width: 100}}><img src={'/animatedClaws.svg'}/></div>
          <div/>
        </>
      ) : (
        <>
          <div className={styles.assets}>
            {data.results.map(
              (item: Omit<PreviewCardProps, 'price' | 'rating'>) => {
                return (
                  <PreviewCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    species={item.species}
                    image={item.image}
                    price={1990}
                    category='2D'
                  />
                )
              },
            )}
          </div>
          <Paginator
            totalCount={Number(data?.info?.count) || 0}
            currentPage={Number(router.query.page) || 1}
            onChange={paginatorHandle}
            siblingCount={1}
            pageSize={Number(router.query.count) || 12}
          />
        </>
      )}
    </div>
  )
}

export default Assets
