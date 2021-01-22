import React from 'react';
import './FlightOptions.css';

const flightOptions = (props) => {
    return (
        <div className="FlightOptions">
            <div className="passengers">{props.passengers}</div>
            <div className="bags">{props.bags}</div>
            <div className="carryOn">{props.carryOn}</div>
            <div className="class">{props.class}</div>
            <div className="price-option">${props.price}</div>
        </div>
    )
}

export default flightOptions;