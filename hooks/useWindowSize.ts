import { useLayoutEffect, useState } from 'react'
import { debounce } from '../utils/debounce'

/**
 * Хук получения размеров окна приложения
 */

export const useWindowSize = () => {
  const [size, setSize] = useState<Array<number>>([
    window.innerWidth,
    window.innerHeight,
  ])
  useLayoutEffect(() => {
    const updateSize = debounce(() => {
      setSize([window.innerWidth, window.innerHeight])
    }, 100)
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])
  return size
}
