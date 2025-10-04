import {Link} from './routes'


export const Header= () => {
  return(
    <nav style={{display:'flex', gap:'10px'}}>
      <Link to ='/Home'>Home</Link>
      <Link to ='/About'>About</Link>
      <Link to ='/Whois'>Whois</Link>
    </nav>
  )
}