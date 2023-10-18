import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useUser } from '../components/User';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { setLoggedIn, updateUserInfo } = useUser()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in both email and password.");
        } else {
            axios.post("http://localhost:8080/login", { email, password })
                .then((response) => {
                    // If the response contains user information, log in
                    if (response.status === 200) {
                        setLoggedIn(true)
                        updateUserInfo(response.data) // Store user info for later use
                        navigate('/profile');
                        // window.location.href = '/profile'
                    } else {
                        setError(response.data)
                    }
                    // window.location.href = '/profile'
                })
                .catch((error) => {
                    setError(<p className="required">Incorrect email or password.</p>);
                    console.error(error);
                });
        }
    }

    return (
        <>
            <h1 className="home-center">Log in</h1>
            <form className="contactForm">

                {/* <SelectDropDown/>  TODO this function is just for testing*/}
                <label>Email</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error}

                <button type="submit" onClick={handleSubmit}>Login</button>
                <button type="button" onClick={() => window.location.href = '/create-account'}>Create account</button>
            </form>
        </>
    )

}