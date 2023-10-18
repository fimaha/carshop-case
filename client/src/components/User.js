import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );
    const [userInfo, setUserInfo] = useState({ name: '', surname: '', email: '' });
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <UserContext.Provider value={{ isLoggedIn, setLoggedIn, userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}
