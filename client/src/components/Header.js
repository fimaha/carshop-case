import carlogo from '../assets/images/carlogo.png';
import Menu from "./Menu"
import "../App.css"

export default function Header() {

  return (
    <nav className="nav-bar">
      <p className="car-icon"><a href="/"><img src={carlogo} alt="logo" height="50" /></a></p>
      <Menu />
    </nav>
  )
}
