import React from 'react';
import './Modal.css';

const modal = (props) => {
    return (
        <div className="Modal">
            <div className="Modal-content">
                {props.message}
                <button onClick={props.click}>Yes</button>
                <button onClick={props.negativeClick}>No</button>
            </div>
        </div>
    )
}

export default modal;