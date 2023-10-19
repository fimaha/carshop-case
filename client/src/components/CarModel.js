import React, { useState } from "react";
import bin from '../assets/images/trash-347.png'

export default function CarModel({ car, onRemove }) {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
            className={`car-model ${hovered ? "hovered" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div c
                className={`car-info ${hovered ? "hovered" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {car.brand} {car.model} - {car.price} kr
            </div>
            <img
                src={bin}  // Replace with the path to your wastebin image
                alt="Remove"
                className="remove-button"
                onClick={() => onRemove(car.id)}
            />
        </div>
    );
}
