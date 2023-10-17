import { useState, useEffect } from "react"
import axios from "axios"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [selectData, setSelectData] = useState([])
    const [selectValue, setSelectValue] = useState("")

    useEffect(() => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    }, [])
    const axiosFetchData = async (processing) => {
        await axios.get('http:localhost:4000/users')
            .then(res => {
                if (processing) {
                    setSelectData(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    const SelectDropDown = () => {
        return (
            <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                {
                    selectData?.map((item, index) => (
                        <option value={item.website} key={item.website}>{item.website}</option>
                    ))
                }
            </select>
        )
    }

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
            <h1>Log in</h1>
            <form className="contactForm">
                {/* <SelectDropDown/>  TODO this function is just for testing*/}
                <label>Email</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail()} />

                <label>Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword()} />


                {error}

                <button type="submit" onClick={handleSubmit}>Login</button>
                <button type="button" onClick={() => window.location.href = '/create-account'}>Create account</button>
            </form>
        </>
    )

}