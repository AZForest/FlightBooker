import React from 'react';
import './AvailableFlights.css';
import { connect } from 'react-redux';
import Flight from '../Flight/Flight';
import * as actionTypes from '../../store/actions';
import axios from 'axios';
import refreshIcon from '../../assets/white-refresh.jpg';

class AvailableFlights extends React.Component {

    componentDidMount() {
        axios.get('https://peaceful-hollows-15789.herokuapp.com/availableFlights')
        .then(response => {
            this.props.onInitFlights(response);
        })
        .catch(err => {
            console.log(err);
        })
    }

    refreshFlights() {
        axios.get('https://peaceful-hollows-15789.herokuapp.com/refreshFlights')
        .then(response => {
            this.props.onInitFlights(response);
            this.props.onRemoveFlight();
        })
        .catch(err => {
            console.log(err);
        })
    }

    resetSelectedFlight(flight) {
        this.props.onRemoveFlight();
        setTimeout(() => {
            this.props.onSelectFlight(flight);
        }, 10);
        

    }

    render() {
        let flights = "";
        if (this.props.avFlights !== null) {
            flights = this.props.avFlights.map((flight, i) => {
                return <Flight 
                        carrier={flight.carrier}
                        dCity={flight.dCity}
                        aCity={flight.aCity}
                        date={flight.date}
                        price={flight.price}
                        key={i}
                        click={() => this.resetSelectedFlight(flight)}/>
            })
        }


        return (
            <div className="av-f-c">
                <div className="top-div">
                    <h3>Available Flights</h3>
                    <button className="new-flights-btn" onClick={() => this.refreshFlights()}>Refresh Flights ⟳</button>
                </div>
                <ul className="category-desc">
                        <li>Carrier</li>
                        <li>Depature City</li>
                        <li>Arrival City</li>
                        <li>Date</li>
                        <li>Price</li>
                </ul>
                <div className="AvFlightsContainer">
                    {flights} 
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        avFlights: state.availableFlights,
        selFlight: state.selectedFlight
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitFlights: (flightData) => dispatch({type: actionTypes.INIT_FLIGHTS, flightData}),
        onSelectFlight: (flight) => dispatch({type: actionTypes.ADD_FLIGHT, flightData: {carrier: flight.carrier, dCity: flight.dCity, aCity: flight.aCity, date: flight.date, price: flight.price} }),
        onRemoveFlight: () => dispatch({type: actionTypes.REMOVE_FLIGHT})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableFlights);