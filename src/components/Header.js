import carlogo from '../assets/images/carlogo.png'
import { useUser } from './User';

export default function Header() {
  const { isLoggedIn } = useUser();
  return (
    <nav className="nav-bar">
      <p><a href="/"><img src={carlogo} alt="logo" height="50" /></a></p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="contact-us">Contact</a></li>
        {/* <li><a href="login">Log in</a></li> */}
        {isLoggedIn ? (
          <li><a href="profile">My Profile</a></li>
        ) : (
          <li><a href="login">Log in</a></li>
        )}
      </ul>
    </nav>
  )
}