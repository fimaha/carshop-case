import { useUser } from '../components/User';

export default function Profile() {
    const { setLoggedIn, userInfo } = useUser()

    return (
        <>
            <h1 className="home-center">My Account</h1>
            <form className="accountInfo">
                <p>Name: {userInfo.name}</p>
                <p>Surname: {userInfo.surname}</p>
                <p>Email: {userInfo.email}</p>
                <button type="button" onClick={() => {
                    window.location.href = '/'
                    setLoggedIn(false)
                }}>Log out</button>

            </form>
            {/* TODO if employee */}

        </>
    )
}