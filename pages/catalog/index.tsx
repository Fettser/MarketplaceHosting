import styles from './Catalog.module.scss'
import Assets from '../../components/Assets/Assets'
import dynamic from 'next/dynamic'

const DynamicFilter = dynamic(() => import('../../components/Filter/FilterBlock'), {
  ssr: false
})

export default function Catalog() {
  return (
    <div className={styles.container}>
      <DynamicFilter/>
      <Assets />
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {}
  }
}