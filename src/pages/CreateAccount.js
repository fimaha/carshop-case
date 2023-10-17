import { useState } from "react"
import { useUser } from '../components/User';

export default function CreateAccount() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { isLoggedIn, setLoggedIn } = useUser()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            setError(<p className="required">Please type an email to log in.</p>)
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
            <h1>Create Account</h1>
            <form className="contactForm">
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