import React from 'react';
import AvailableFlights from '../../components/AvailableFlights/AvailableFlights';
import SelectFlight from '../../components/SelectFlight/SelectFlight';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import './FlightSelector.css';

const FlightSelector = (props) => {
    return (
        <div>
            <AvailableFlights />
            <SelectFlight />
        </div>
    )   
}

const mapStateToProps = state => {
    return {
        avFlights: state.availableFlights,
        selFlight: state.selectedFlight
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectFLight: (carrier, dCity, aCity, date, price) => dispatch({type: actionTypes.ADD_FLIGHT, flightData: {carrier: carrier, dCity: dCity, aCity: aCity, date: date, price: price} }),
        onRemoveFlight: () => dispatch({type: actionTypes.REMOVE_FLIGHT})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSelector);