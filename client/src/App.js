import './App.css'
import Router from './components/Router'
import { UserProvider } from './components/User'

export default function App() {

  return (
    <>
      <UserProvider>
        <Router />
      </UserProvider>
    </>
  );
}