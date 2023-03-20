import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import lightTheme from '../../theme/light'
import darkTheme from '../../theme/dark'

export enum ThemeType {
  LIGHT = 'light' ,
  DARK = 'dark'
}

const themes = {
  light: lightTheme,
  dark: darkTheme as unknown as VideoChatTheme
}

type VideoChatTheme = typeof lightTheme

const ThemeContext = createContext<VideoChatTheme>(lightTheme)

export function GgjThemeProvider({children, themeType = ThemeType.LIGHT}: {
  children: ReactNode
  themeType?: ThemeType
}) {
  const [theme, setTheme] = useState<VideoChatTheme>(themes[themeType])

  useEffect(() => {
    setTheme(themes[themeType])
  }, [themeType])

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
