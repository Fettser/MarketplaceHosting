import { useState, useEffect, ReactNode, FC } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children?: ReactNode
}

/**
 * Компонент портала, основанный на createPortal.
 * param children - отображаемый компонент
 */

const Portal: FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => {
      setMounted(false)
    }
  }, [])

  return mounted
    ? createPortal(children, document.querySelector('#portal') as Element)
    : null
}

export default Portal