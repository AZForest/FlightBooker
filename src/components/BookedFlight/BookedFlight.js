import React from 'react';
import './BookedFlight.css';

const bookedFlight = (props) => {
    return (
        <React.Fragment>
            <div className="BookedFlight" onClick={props.click}>
                <p>{props.carrier}</p>
                <p>{props.dCity}</p>
                <p>{props.aCity}</p>
                <p>{props.date}</p>
                <p>{props.passengers}</p>
                <p>{props.bags}</p>
                <p>{props.carryOn}</p>
                <p>${props.totalPrice}</p>
                <div className="bFlight-X">x</div>
            </div>
            
        </React.Fragment>
    )
}

export default bookedFlight;