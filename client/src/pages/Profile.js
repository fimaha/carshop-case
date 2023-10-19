import React, { useState, useEffect } from 'react';
import { useUser } from '../components/User';
import BootstrapSpinner from '../components/BootstrapSpinner';
import axios from "axios";
import "./Pages.css";

export default function Profile() {
    const { setLoggedIn, userInfo } = useUser()
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        if (userInfo.email) {
            const fullName = userInfo.name + ' ' + userInfo.surname;

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
            <div className="employee-list-item">
                <div className="employee-info" >
                    {userInfo.email ? (
                        <>
                            <p>Name: {userInfo.name + ' ' + userInfo.surname}</p>
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

                </div>
            </div>

        </>
    )
}