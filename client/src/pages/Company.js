import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pages.css";
import BootstrapSpinner from "../components/BootstrapSpinner";

export default function Company() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employee data from the API when the component mounts
        axios.get("http://localhost:8080/employees").then((response) => {
            setEmployees(response.data);
        });
    }, []);

    return (
        <div className="content">
            <h2 className="home-center">Employee Information</h2>
            {employees ? (
                <ul className="employee-list">
                    {Object.values(employees).map((employee) => (
                        <li key={employee.id} className={`employee-list-item ${employee.hovered ? "hovered" : ""}`}>
                            <div className={`employee-info ${employee.hovered ? "hovered" : ""}`}>
                                <h4>{employee.name}</h4>
                                <p>Employee ID: {employee.id}</p>
                                <p>Total Sales Amount: {employee.totalSalesAmount}</p>
                                <p>Cars Sold:
                                    <ul>
                                        {employee.carsSold.map((car, index) => (
                                            <li key={index}>
                                                {car.brand} {car.model} - {car.price} kr
                                            </li>
                                        ))}
                                    </ul>
                                </p>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <BootstrapSpinner />
            )}
        </div>
    );
}
