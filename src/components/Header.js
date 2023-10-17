import carlogo from '../assets/images/carlogo.png'
import { useContext } from 'react'
import Context from './Context'

export default function Header() {
  const userData = useContext(Context)
  return (
    <nav className="nav-bar">
      <p><a href="/"><img src={carlogo} alt="logo" height="50" /></a></p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="contact-us">Contact</a></li>
        <li><a href="login">Log in</a></li>
      </ul>
    </nav>
  )
}