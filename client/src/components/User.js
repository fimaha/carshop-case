import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}
