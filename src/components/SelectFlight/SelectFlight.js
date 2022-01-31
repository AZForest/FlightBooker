import './SelectFlight.css';
import React from 'react';
import { connect } from 'react-redux';
import FlightOptions from '../FlightOptions/FlightOptions';
import * as actionTypes from '../../store/actions';
import blackPlane from '../../assets/blackplane1.png';
import Modal from '../Modal/Modal';
import axios from 'axios';

class SelectFlight extends React.Component {
    state = {
        isClickable: false,
        modalVisible: false,
        reRender: false
    }

    componentDidUpdate(prevProps) {
        //console.log(prevProps);
        if (prevProps.sFlight !== this.props.sFlight && prevProps.sFlight !== null && this.props.sFlight !== null) {
            this.resetComponent();
        }

    }

    resetComponent() {
        this.setState({reRender: !this.state.reRender})
    }

    onChangeHandler = (e) => {
        this.props.onSetClass(e.target.value);
    }

    setModalVisible() {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    purchaseFlight = () => {
        let flightData = { 
            carrier: this.props.sFlight.carrier, 
            dCity: this.props.sFlight.dCity, 
            aCity: this.props.sFlight.aCity, 
            date: this.props.sFlight.date, 
            passengers: this.props.options.passengers, 
            bags: this.props.options.bags, 
            carryOn: this.props.options.carryOn, 
            class: this.props.options.class, 
            price: this.props.totalPrice,
            id: Math.random() 
        };

        axios.post('https://peaceful-hollows-15789.herokuapp.com/BookedFlights', flightData)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
        this.props.onBookFlight();
        axios.get('https://peaceful-hollows-15789.herokuapp.com/BookedFlights')
        .then(response => {
            this.props.onInitBookedFlights(response);
        })
        this.setState({modalVisible: !this.state.modalVisible});
    }

    render() {
    let selFlight = <div className="selFlight"></div>;
    if (this.props.sFlight !== null) {
        selFlight = <div className="selFlight">
                        <div className="selFlight-info">
                            <p>{this.props.sFlight.carrier}</p>
                            <p style={{textTransform: "uppercase"}}>{this.props.sFlight.dCity}</p>
                            <p>to</p>
                            <p style={{textTransform: "uppercase"}}>{this.props.sFlight.aCity}</p>
                            <p>{this.props.sFlight.date}</p>
                            <p>${this.props.sFlight.price}</p>
                        </div>
                        <div className="X" onClick={() => this.props.onRemoveFlight()}>X</div>
                    </div>;
    }
    
    let userOptions = "";
    if (this.props.sFlight !== null) {
        userOptions = <FlightOptions 
        passengers={this.props.options.passengers}
        bags={this.props.options.bags}
        carryOn={this.props.options.carryOn}
        class={this.props.options.class}
        price={this.props.totalPrice}
        />
    }

    let message = <p>Book flight to {this.props.sFlight === null ? "" : this.props.sFlight.aCity} for ${this.props.totalPrice}?</p>;
    let modal = "";
    if (this.state.modalVisible) {
        modal = <Modal message={message} click={() => this.purchaseFlight()} negativeClick={() => this.setModalVisible()}/>
    }

    let flightSelectDisplay = 
        <div className="selFlight" style={{height: "20px"}}>
            <h1 className="please-select-flight">Please Select Flight</h1>
            <img src={blackPlane} alt="pic" className="img1"></img>    
        </div>;

    if (this.props.sFlight !== null) {
        /* if (this.state.reRender) {
            this.delay();
        } else { */
        flightSelectDisplay =
        <div>
            {modal}
            <div className="fade">
                {selFlight}
                <div className="controls-container">
                    <div className="c-control">
                        <p className="c-control-label">Passengers</p>
                        <div className="flightValue">{this.props.sFlight ? this.props.options.passengers : ""}</div>
                        <div className="btns-container1 btns-container">
                            <button className="increment-btn" onClick={() => this.props.onPassengerIncrement()} disabled={this.props.sFlight === null || this.props.options.passengers < 1 ? true : false}>+</button>
                            <button className="decrement-btn" onClick={() => this.props.onPassengerDecrement()} disabled={this.props.sFlight === null || this.props.options.passengers <= 1 ? true : false}>-</button>
                        </div>
                        <p className="c-control-info">Additional<br /> Passengers:<br />Ticket Price x2</p>
                    </div>
                    <div className="c-control">
                        <p className="c-control-label">Bags</p>
                        <div className="flightValue">{this.props.sFlight ? this.props.options.bags : ""}</div>
                        <div className="btns-container2 btns-container">
                            <button className="increment-btn" onClick={() => this.props.onBagIncrement()} disabled={this.props.sFlight === null ? true : false}>+</button>
                            <button className="decrement-btn" onClick={() => this.props.onBagDecrement()} disabled={this.props.sFlight === null || this.props.options.bags === 0 ? true : false}>-</button>
                        </div>
                        <p className="c-control-info">50$/each</p>
                    </div>
                    <div className="c-control">
                        <p className="c-control-label">Carry-Ons</p>
                        <div className="flightValue">{this.props.sFlight ? this.props.options.carryOn : ""}</div>
                        <div className="btns-container3 btns-container">
                            <button className="increment-btn" onClick={() => this.props.onCarryOnIncrement()} disabled={this.props.sFlight === null ? true : false}>+</button>
                            <button className="decrement-btn" onClick={() => this.props.onCarryOnDecrement()} disabled={this.props.sFlight === null || this.props.options.carryOn === 0 ? true : false}>-</button>
                        </div>
                        <p className="c-control-info">30$/each</p>
                    </div>
                    <div className="c-control">
                        <p className="c-control-label">Class</p>
                        <div className="flightValue">{this.props.sFlight ? this.props.options.class : ""}</div>
                        <div className="btns-container btns-container4">
                            <select onChange={this.onChangeHandler}>
                                <option value="Coach">Coach</option>
                                <option value="Second">Second Class</option>
                                <option value="First">First Class</option>
                            </select>
                        </div>
                        <div className="c-control-info class-prices">
                            <p>Coach: Free</p>
                            <p>Second Class: $100</p>
                            <p>First Class: $200</p>
                        </div>
                    </div>
                    <div className="c-control">
                        <p className="c-control-label">Price</p>
                        <div className="flightValue priceValue">{this.props.sFlight ? "$" + this.props.totalPrice : ""}</div>
                    </div>
                    {/*<div className="passenger-label">Passengers</div>
                    <div className="bag-label">Bags</div>
                    <div className="carry-label">Carry-Ons</div>
                    <div className="class-label">Class</div>
                    <div className="price-label">Price</div>
                    <div className="controls2">
                        {userOptions}
                    </div>
                        <div className="btns-container1 btns-container">
                            <button className="increment-btn" onClick={() => this.props.onPassengerIncrement()} disabled={this.props.sFlight === null || this.props.options.passengers < 1 ? true : false}>+</button>
                            <button className="decrement-btn" onClick={() => this.props.onPassengerDecrement()} disabled={this.props.sFlight === null || this.props.options.passengers <= 1 ? true : false}>-</button>
                        </div>
                        <div className="btns-container2 btns-container">
                            <button className="increment-btn" onClick={() => this.props.onBagIncrement()} disabled={this.props.sFlight === null ? true : false}>+</button>
                            <button className="decrement-btn" onClick={() => this.props.onBagDecrement()} disabled={this.props.sFlight === null || this.props.options.bags === 0 ? true : false}>-</button>
                        </div>
                        <div className="btns-container3 btns-container">
                            <button className="increment-btn" onClick={() => this.props.onCarryOnIncrement()} disabled={this.props.sFlight === null ? true : false}>+</button>
                            <button className="decrement-btn" onClick={() => this.props.onCarryOnDecrement()} disabled={this.props.sFlight === null || this.props.options.carryOn === 0 ? true : false}>-</button>
                        </div>
                        <div className="btns-container btns-container4">
                            <select onChange={this.onChangeHandler}>
                                <option value="Coach">Coach</option>
                                <option value="Second">Second Class</option>
                                <option value="First">First Class</option>
                            </select>
                        </div>
                        
                        <p className="additional-passengers">Additional<br /> Passengers:<br />Ticket Price x2</p>
                        <p className="additional-bags">50$/each</p>
                        <p className="additional-carry">30$/each</p>
                        <div className="class-prices">
                            <p>Coach: Free</p>
                            <p>Second Class: $100</p>
                            <p>First Class: $200</p>
                    </div>*/}
                </div>
                    <button className="Bookbtn" onClick={() => this.setModalVisible()}>Book</button>
            </div>
    </div>
        
    }

    return (
        
        <div className="SelectFlightContainer" style={this.props.sFlight ? {height: "auto"} : {height: "350px"}}>
            {flightSelectDisplay}
        </div>
    )
    }
}

const mapStateToProps = state => {
    return {
        sFlight: state.selectedFlight,
        options: state.options,
        totalPrice: state.totalPrice,
        bFlights: state.bookedFlights
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPassengerIncrement: () => dispatch({type: actionTypes.PASSENGER_INCREMENT}),
        onPassengerDecrement: () => dispatch({type: actionTypes.PASSENGER_DECREMENT}),
        onBagIncrement: () => dispatch({type: actionTypes.BAG_INCREMENT}),
        onBagDecrement: () => dispatch({type: actionTypes.BAG_DECREMENT}),
        onCarryOnIncrement: () => dispatch({type: actionTypes.CARRYON_INCREMENT}),
        onCarryOnDecrement: () => dispatch({type: actionTypes.CARRYON_DECREMENT}),
        onSetClass: (val) => dispatch({type: actionTypes.SET_CLASS, val}),
        onRemoveFlight: () => dispatch({type: actionTypes.REMOVE_FLIGHT}),
        /* onBookFlight: (carrier, dCity, aCity, date, passengers, bags, carryOn, classType, totalPrice) => dispatch({type: actionTypes.BOOK_FLIGHT, flightData: {
            carrier: carrier, 
            dCity: dCity, 
            aCity: aCity, 
            date: date, 
            passengers: passengers,
            bags: bags,
            carryOn: carryOn,
            class: classType,
            totalPrice: totalPrice
            }
        }), */
        onBookFlight: () => dispatch({type: actionTypes.BOOK_FLIGHT}),
        onInitBookedFlights: (flights) => dispatch({type: actionTypes.INIT_BOOKED_FLIGHTS, flights})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFlight);