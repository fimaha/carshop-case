import { useUser } from '../components/User';

export default function Profile() {
    const { isLoggedIn, setLoggedIn } = useUser()

    return (
        <>
            <h1 className="home-center">My Account</h1>
            <form className="accountInfo">
                <button type="button" onClick={() => {
                    window.location.href = '/'
                    setLoggedIn(false)
                }}>Log out</button>

            </form>
            {/* TODO if employee */}

        </>
    )
}