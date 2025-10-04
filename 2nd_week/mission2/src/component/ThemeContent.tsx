
import {THEME,useTheme} from "../context/ThemeProvider"
import clsx from 'clsx';
export default function ThemeContent(){
   const {theme, toggleTheme} = useTheme();
   const isLightMode = theme === THEME.Light
  return(
    <div className={clsx(
      'p-4 h-dvh ', isLightMode ? 'bg-white' :'bg-gray-800'
    )}>
      <h1 className={clsx
        ('text-wxl font-bold', isLightMode?'text-black':'text-white')
      }>
        ThemeContent
      </h1>
      <p className={clsx(
        'mt-2',isLightMode?'text-black':'text-white'
      )}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur tempore aspernatur a distinctio rem facere animi, explicabo numquam cum assumenda perspiciatis sint odio dolor? Nemo quas reiciendis necessitatibus porro dolore.
        </p>
      </div>
  )
}