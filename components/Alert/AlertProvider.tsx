import Portal from '../Portal/Portal'
import styles from './Alert.module.scss'
import { createContext, FC, ReactNode, useContext, useState, useRef } from 'react'
import Alert from './Alert'
import { AnimatePresence, motion } from 'framer-motion'

interface Content {
  text: string,
  instance: 'error' | 'success' | 'pending'
}

function generateUEID() {
  const first = (Math.random() * 46656) | 0
  const second = (Math.random() * 46656) | 0
  return ('000' + first.toString(36)).slice(-3) + ('000' + second.toString(36)).slice(-3)
}

interface AlertProviderValue {
  open?: (content: Content) => void
}

const AlertContext = createContext<AlertProviderValue>({})

interface AlertProviderProps {
  children: ReactNode
}

export const useAlert = () => {
  return useContext(AlertContext)
}

interface ContentWithId extends Content {
  id: string
}

/**
 * Компонент провайдера, позволяющий управлять появлением и скрытием всплывающих окон
 * param {ReactNode} children - компонент, которому предоставляется управление всплывающими окнами
 */

const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Array<ContentWithId>>([])

  const open = (content: Content) => {
    setAlerts(prevState => [...prevState, { id: generateUEID(), ...content }])
  }
  const close = (id: string) => {
    setAlerts(prevState => prevState.filter(alert => alert.id !== id))
  }

  return (
    <AlertContext.Provider value={{ open }}>
      <Portal>
        <div className={styles.container}>
          <AnimatePresence>
            {alerts.map((alert) => (
              <Alert message={alert.text} status={alert.instance} key={alert.id} onClose={() => close(alert.id)} />
            ))}
          </AnimatePresence>
        </div>
      </Portal>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider