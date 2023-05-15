import { useThemeToggle } from '../../hooks/useThemeToggle'
import Moon from '../../public/moon.svg'
import Sun from '../../public/sun.svg'
import styles from './ThemeToggle.module.scss'
import { motion } from 'framer-motion'

enum Themes {
  light = 'light',
  dark = 'dark',
}

/**
 * Компонент переключения темы
 */

const ThemeToggle = () => {
  const { mounted, theme, setTheme } = useThemeToggle()

  if (!mounted) {
    return (
      <div className={styles.switch}>
        <div className={styles.handle}></div>
      </div>
    )
  }
  return (
    <button
      className={styles.switch}
      onClick={() => {
        setTheme(theme === Themes.dark ? Themes.light : Themes.dark)
      }}
    >
      <div role='button'
        className={styles.handle}
        data-ison={theme === Themes.dark}
      >
        {theme === Themes.dark ? <Moon /> : <Sun />}
      </div>
    </button>
  )
}

export default ThemeToggle
