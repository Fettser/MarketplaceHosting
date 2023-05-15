import {useEffect, useRef} from 'react'

/**
 * Хук установки тайм-аута
 * @param {(...params: any[]) => any} callback - callback-функция
 * @param {number} delay - задержка
 */

export const useTimeout = (callback: (...params: any[]) => any, delay?: number) => {
  const callbackRef = useRef<(...params: any[]) => any>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === undefined) return

    const id = setTimeout(() => callbackRef.current(), delay)

    return () => {
      console.log('delete timeout')
      clearTimeout(id)
    }
  })
}