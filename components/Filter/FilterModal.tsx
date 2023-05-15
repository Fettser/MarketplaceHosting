import { useState } from 'react'
import Button from '../../UI/Button/Button'
import FilterIcon from '../../public/filter.svg'
import { useWindowSize } from '../../hooks/useWindowSize'
import styles from './FilterModal.module.scss'
import Modal from '../Modal/Modal'

const FilterModal = () => {
  const [open, setOpen] = useState(false)
  const [width, height] = useWindowSize()
  const [open1, setOpen1] = useState(false)

  if (width >= 481) {
    return null
  }

  return (
    <>
      <Button className={styles.btn} onClick={() => setOpen(true)} as='button'>
        <FilterIcon />
      </Button>
      <Modal open={open} setOpen={() => setOpen(false)}>
        <div style={{height: 150}}></div>
      </Modal>
    </>
  )
}

export default FilterModal