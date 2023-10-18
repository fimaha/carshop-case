import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CarModelList() {
    const [carModels, setCarModels] = useState([]);

    useEffect(() => {
        // Fetch car models from the backend
        axios.get('http://localhost:8080/carmodels')
            .then((response) => {
                setCarModels(response.data);
            })
            .catch((error) => {
                console.error('Error fetching car models:', error);
            });
    }, []);

    return (
        <div>
            <h2>Car Models</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {carModels.map((model) => (
                        <tr key={model.id}>
                            <td>{model.id}</td>
                            <td>{model.brand}</td>
                            <td>{model.model}</td>
                            <td>{model.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
