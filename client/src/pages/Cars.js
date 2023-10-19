import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from 'react-uuid';
import CarModel from "../components/CarModel";
import { useUser } from '../components/User';
import "./Pages.css";

export default function CarModelList() {
    const [carmodels, setCarmodels] = useState([]);
    const [newCar, setNewCar] = useState({ brand: "", model: "", price: "", id: uuid() });
    const { isLoggedIn } = useUser()

    useEffect(() => {
        // Fetch car models from the API when the component mounts
        axios.get("http://localhost:8080/carmodels").then((response) => {
            setCarmodels(response.data);
        });
    }, []);

    const addCar = () => {
        // Send a POST request to add a new car
        axios
            .post("http://localhost:8080/carmodels", newCar)
            .then((response) => {
                // Add the new car to the local state
                setCarmodels([...carmodels, response.data]);
                setNewCar({ brand: "", model: "", price: "", id: uuid() });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const removeCar = (carId) => {
        // Send a DELETE request to remove a car
        axios
            .delete(`http://localhost:8080/carmodels/${carId}`)
            // .then(() => {
            //     // Remove the car from the local state
            //     // const updatedCarmodels = carmodels.filter((car) => car.id !== carId);
            //     // setCarmodels(updatedCarmodels);
            // })
            .catch((error) => {
                console.error(error);
            });
        const updatedCarmodels = carmodels.filter((car) => car.id !== carId);
        setCarmodels(updatedCarmodels);
    };

    return (
        <div className="content">
            <h2 className="home-center">Cars for sale</h2>
            {carmodels.map((car) => (
                <CarModel key={car.id} car={car} onRemove={removeCar} />
            ))}
            {isLoggedIn ? (
                <>
                    <h2 className="home-center">Add a New Car</h2>
                    <div className="new-car-form">

                        <div className="car-form-inputs">
                            <input
                                type="text"
                                placeholder="Brand"
                                value={newCar.brand}
                                onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Model"
                                value={newCar.model}
                                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={newCar.price}
                                onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                            />
                            <button className="add-car-button" onClick={addCar}>
                                Add Car
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}