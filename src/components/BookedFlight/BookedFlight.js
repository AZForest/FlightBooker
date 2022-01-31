import React from 'react';
import './BookedFlight.css';

const bookedFlight = (props) => {
    return (
        <React.Fragment>
            <div className="BookedFlight" onClick={props.click}>
                <p className='BookedFlight-carrier'>{props.carrier}</p>
                <p>Departure: {props.dCity}</p>
                <p>Arrival: {props.aCity}</p>
                <p>Date: {props.date}</p>
                <p>Passengers: {props.passengers}</p>
                <p>Bags: {props.bags}</p>
                <p>Carry-Ons: {props.carryOn}</p>
                <p>Price: ${props.totalPrice}</p>
                <div className="bFlight-X">x</div>
            </div>
            
        </React.Fragment>
    )
}

export default bookedFlight;