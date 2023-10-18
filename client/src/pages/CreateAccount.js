import { useState } from "react"
import { useUser } from '../components/User';

export default function CreateAccount() {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { isLoggedIn, setLoggedIn } = useUser()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            setError(<p className="required">Please type your name to log in.</p>)
        } else if (!surname) {
            setError(<p className="required">Please type your surname to log in.</p>)
        } else if (!email) {
            setError(<p className="required">Please type your email to log in.</p>)
        } else if (!password) {
            setError(<p className="required">Please type a password to log in.</p>)
        } else {
            setError(<p className="success">Account created!</p>)
            setLoggedIn(true)
            // TODO ADD EMAIL 
            // axiosPostData()
        }
    }
    return (
        <>
            <h1 className="home-center">Create Account</h1>
            <form className="contactForm">
                <label>Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Surname</label>
                <input type="text" id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />

                <label>Email</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />


                {error}

                <button type="submit" onClick={handleSubmit}>Create Account</button>
            </form>
        </>
    )

}