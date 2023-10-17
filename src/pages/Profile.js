import { useUser } from '../components/User';

export default function Profile() {
    const { isLoggedIn, setLoggedIn } = useUser()

    return (
        <div className="home-container">
            <h1>My Account</h1>

            <form className="accountInfo">
                <button type="button" onClick={() => {
                    window.location.href = '/'
                    setLoggedIn(false)
                }}>Log out</button>

            </form>
            {/* TODO if employee */}

        </div>
    )
}