import './App.css'
import Router from './components/Router'
import Context from './components/Context'
// import { initializeApp } from 'firebase/app'
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

export default function App() {
  const userInfo = {
    name: "Filippa",
    email: "filippahaansen@gmail.com",
    loggedIn: true,
    employee: true,
  }

  return (
    <>
      <Context.Provider value={userInfo}>
        <Router />
      </Context.Provider>
    </>
  );
}