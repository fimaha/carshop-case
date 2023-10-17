import { useState } from "react"

export default function CreateAccount() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            setError(<p className="required">'Please type an email to log in.' </p>)
        } else {
            setError("")
        }

        if (!password) {
            setError(<p className="required">'Please type a password to log in.' </p>)
        } else {
            setError("")
        }
    }
    return (
        <>
            <h1>Create Account</h1>
            <form className="contactForm">
                <label>Email</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail()} />

                <label>Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword()} />


                {error}

                <button type="submit" onClick={handleSubmit}>Create Account</button>
            </form>
        </>
    )

}