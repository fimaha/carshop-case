import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../components/User';

import axios from "axios";

export default function Profile() {
    const { setLoggedIn, userInfo } = useUser()



    return (
        <>
            <h1 className="home-center">My Account</h1>
            <form className="accountInfo">
                {userInfo.email ? (
                    <>
                        <p>Name: {userInfo.name}</p>
                        <p>Surname: {userInfo.surname}</p>
                        <p>Email: {userInfo.email}</p>
                    </>
                ) : (
                    <p>Loading user information...</p>
                )}
                <button type="button" onClick={() => {
                    window.location.href = '/'
                    setLoggedIn(false)
                }}>Log out</button>

            </form>
            {/* TODO if employee */}

        </>
    )
}