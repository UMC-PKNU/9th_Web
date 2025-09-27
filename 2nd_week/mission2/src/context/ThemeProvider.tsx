import {createContext, useState} from 'react'
import {useContext} from 'react'
export enum THEME {
  Light = 'light',
  Dark ='dark'
}


type TTheme = THEME.Light | THEME.Dark
interface IThemeContext{
  theme:TTheme,
  toggleTheme : () => void
}


export const  ThemeContext = createContext<IThemeContext|undefined>(undefined)
export const ThemeProvider = ({children}:PropsWithChildren) => {
  const [theme,setTheme] = useState<TTheme>(THEME.Light)

  const toggleTheme =() =>{
    setTheme((prevTheme) => prevTheme === THEME.Light ? THEME.Dark : THEME.Light) 
  }
  return(
    <ThemeContext.Provider value={{theme,toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme =() =>{
  const context =useContext(ThemeContext)

  if(!context){
    throw new Error('useTheme must be uesed within a ThemeProvider')
    
  }
  return context
}

