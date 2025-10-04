import {useState,useEffect} from 'react';
import type {ReactElement,ReactNode} from 'react'
import {Route} from './Route.tsx'
import React from 'react';



export function getCurrentpath():string {
  return window.location.pathname;
}

export function navigateTo(url:string){
  window.history.pushState(null,'',url);
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useCurrentPath(){
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() =>{
    const onLocationChange = () => setPath(window.location.pathname)
    window.addEventListener('popstate',onLocationChange)
    return () => window.removeEventListener('popstate',onLocationChange)

  }, [])

  return path
}

export function isRouteElement(child: ReactNode): child is ReactElement {
  return(
    React.isValidElement(child) &&
    child.type === Route
  )
}


