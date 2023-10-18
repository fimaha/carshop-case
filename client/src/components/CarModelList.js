import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CarModelList() {
    const [carmodels, setCarmodels] = useState([]);
    const [newCar, setNewCar] = useState({ brand: "", model: "", price: 0 });

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
                setNewCar({ brand: "", model: "", price: 0 });
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
        <div>
            <h2>Car Models</h2>
            <ul>
                {carmodels.map((car) => (
                    <li key={car.id}>
                        {car.brand} {car.model} - {car.price} kr
                        <button onClick={() => removeCar(car.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Add a New Car</h3>
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
            <button onClick={addCar}>Add Car</button>
        </div>
    );
}