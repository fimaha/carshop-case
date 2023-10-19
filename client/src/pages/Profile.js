import React, { useState, useEffect } from 'react';
import { useUser } from '../components/User';
import BootstrapSpinner from '../components/BootstrapSpinner';

import axios from "axios";

export default function Profile() {
    const { setLoggedIn, userInfo } = useUser()
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        if (userInfo.email) {
            // Create the full name
            const fullName = userInfo.name + ' ' + userInfo.surname;

            // Fetch employee data
            axios.get(`/employee-info?fullName=${fullName}`)
                .then((response) => {
                    const employeeInfo = response.data;
                    setEmployeeData(employeeInfo);
                })
                .catch((error) => {
                    console.error(error);

                });
        }
    }, [userInfo.email, userInfo.name, userInfo.surname]);

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
                {employeeData ? (
                    <>
                        <p>Employee ID: {employeeData.id}</p>
                        <p>Total Sales Amount: {employeeData.totalSalesAmount}</p>
                        <p>Cars Sold: {employeeData.carsSold.join(', ')}</p>
                    </>
                ) : (
                    <BootstrapSpinner />
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