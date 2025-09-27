import React from 'react';
import {useContext} from 'react'
import {THEME,ThemeProvider, useTheme} from '../context/ThemeProvider'
import ThemeToggleButton from '../context/ThemeToggleButton';
import clsx from 'clsx';
export default function Navbar(){
   const {theme, toggleTheme} = useTheme();
    const isLightMode = theme === THEME.Light
  return(
    <nav className={clsx(
      'p-4 w-full flex justify-end'
      ,isLightMode ? 'bg-white':'bg-gray-800'
    )}><ThemeToggleButton/></nav>
  )
}