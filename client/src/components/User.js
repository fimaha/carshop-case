import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );

    let userInfoFromLocalStorage = localStorage.getItem('userInfo');
    userInfoFromLocalStorage = userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null;
    const [userInfo, setUserInfo] = useState(userInfoFromLocalStorage);


    const updateUserInfo = (data) => {
        setUserInfo(data);
    };
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
    }, [isLoggedIn, userInfo]);

    return (
        <UserContext.Provider value={{ isLoggedIn, setLoggedIn, userInfo, updateUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}
