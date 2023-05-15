import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

/**
 * Хук переключения темы приложения
 */

export const useThemeToggle = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return { mounted, theme, setTheme }
}
