import { useState } from "react"

export default function Contact() {

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!message) {
            setError(<p className="required">'Message is empty. Please type a message.' </p>)
        } else {
            setError("")
        }
    }
    return (
        <>
            <h1>Contact Us</h1>
            <form className="contactForm">
                <label>Email</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail()} />

                <label>Message</label>
                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}> </textarea>

                {error}

                <button type="submit" onClick={handleSubmit}>Sumbit</button>
            </form>
        </>
    )

}