import React from 'react';
import './Flight.css';

const Flight = (props) => {
    return (
        <div className="Flight" onClick={props.click}>
            <p>{props.carrier}</p>
            <p>{props.dCity}</p>
            <p>{props.aCity}</p>
            <p>{props.date}</p>
            <p>${props.price}</p>
        </div>
    )
}

export default Flight;