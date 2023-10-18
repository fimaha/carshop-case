import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useUser } from '../components/User';

export default function Login() {
    const { isLoggedIn, setLoggedIn } = useUser()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [selectData, setSelectData] = useState([])

    useEffect(() => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    }, [])
    const axiosFetchData = async (processing) => {
        // const options ={
        //     email:email,
        //     password:password,
        // }
        // await axios.post('http:localhost:8080/users', options)
        await axios.get('http:localhost:8080/users')
            .then(res => {
                if (processing) {
                    setSelectData(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    const axiosPostData = async () => {
        const postData = {
            email: email,
            password: password,
        }
        // setError(<p className="success"></p>)
        await axios.post('http://localhost:8080/user', postData)
            .then(res =>
                // setLoggedIn(true)
                setError(<p className="success">{res.data}</p>)
            )
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            setError(<p className="required">Please type an email to log in.{email}</p>)
        } else if (!password) {
            setError(<p className="required">'Please type a password to log in.' </p>)
        } else {
            // setError(<p className="success">Successfully logged in!</p>)
            setLoggedIn(true)
            window.location.href = '/profile'
            // TODO ADD EMAIL 
            // axiosPostData()
        }


        // window.location.href = '/'
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