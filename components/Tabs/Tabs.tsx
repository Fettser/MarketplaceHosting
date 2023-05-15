import { ReactNode, FC, useState, useEffect, useRef } from 'react'
import Button from '../../UI/Button/Button'
import styles from './Tabs.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface TabProps {
  label: string
  component: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  options: TabProps[]
  defaultTab?: string
  wrapped?: boolean
}

/**
 * Tabs - компонент
 * param options - массив компонентов с их идентификаторами
 * param defaultTab - начальное значение выбранного компонента
 * param wrapped - флаг, сообщающий о необходимости оборачивания компонентов в единый контейнер
 */

const Tabs: FC<TabsProps> = ({ options, defaultTab, wrapped = false }) => {
  const [selected, setSelected] = useState<string>(defaultTab || options[0].label)

  const classes = cx({
    container: true,
    wrapped
  })

  return (
    <div className={classes}>
      <div className={styles.panel}>
        {options.map((item: TabProps) => (
          <Button
            as='button'
            key={item.label}
            disabled={item.disabled || selected === item.label}
            data-selected={selected === item.label}
            onClick={() => setSelected(item.label)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className={styles.content}>
        {options.find(item => item.label === selected)?.component}
      </div>
    </div>
  )
}

export default Tabs