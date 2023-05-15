import styles from './FilterBlock.module.scss'
import { useWindowSize } from '../../hooks/useWindowSize'
import Filter from './Filter'

const FilterBlock = () => {
  const [width, height] = useWindowSize()

  if (width < 481) {
    return null
  }

  return (
    <div className={styles.container}>
      <Filter/>
    </div>
  )
}

export default FilterBlock
