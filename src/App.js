import './App.css'
import Router from './components/Router'
import { UserProvider } from './components/User'
// import { initializeApp } from 'firebase/app'
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

export default function App() {

  return (
    <>
      <UserProvider>
        <Router />
      </UserProvider>
    </>
  );
}