import carlogo from '../assets/images/carlogo.png'

export default function Header() {
  return (
    <nav className="nav-bar">
      <p><a href="/"><img src={carlogo} alt="logo" height="50" /></a></p>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="contact-us">Contact</a>
        </li>
        <li>
          <a href="log-in">Log in</a>
        </li>
      </ul>
    </nav>
  )
}