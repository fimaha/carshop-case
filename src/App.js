import logo from './logo.svg';
import './App.css';

function App() {
  const header = <nav className="nav-bar">
    <p>Logo</p>
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="contact-us">Contact</a>
      </li>
      <li>
        <a href="/">Log in</a>
      </li>
      </ul>
      </nav>


  return (
    <>
    {header}
      <h1>Homepage</h1>
      <p>This is the homepage.</p>
    </>
       
  );
}

export default App;