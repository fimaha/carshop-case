import { useState } from "react"
import { useUser } from '../components/User';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function CreateAccount() {
    const { setLoggedIn, updateUserInfo } = useUser()
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !surname || !email || !password) {
            setError(<p className="required">Please fill in all fields.</p>);
        } else {
            axios
                .post("http://localhost:8080/account", { name, surname, email, password })
                .then((response) => {
                    if (response.status === 200) {
                        setLoggedIn(true);
                        updateUserInfo({ name, surname, email })
                        navigate('/profile');
                    } else {
                        setError(<p className="error">Error creating the account.</p>);
                    }
                })
                .catch((error) => {
                    setError(<p className="error">Error creating the account.</p>);
                    console.error(error);
                });
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