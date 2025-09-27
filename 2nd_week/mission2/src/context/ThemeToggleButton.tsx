import {useContext} from 'react'
import {ThemeContext, useTheme, THEME} from './ThemeProvider'
import clsx from 'clsx';

export default function ThemeToggleButton(){
  const {theme, toggleTheme} = useTheme();
  const isLightMode = theme === THEME.Light
  return <div>

    <button 
      onClick={toggleTheme}
      className={clsx('px-4 py-2 mt-4 rounded-md transition-all',{
        'bg-black text-white':!isLightMode,
        'bg-white text-black':isLightMode
      })}
    >
      {isLightMode ? '🌙다크모드' : '☀️라이트 모드'}
    </button>
  </div>
}