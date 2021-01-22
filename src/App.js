import TopBar from './components/TopBar/TopBar';
import './App.css';
import FlightSelector from './containers/FlightSelector/FlightSelector';
import BookedFlights from './containers/BookedFlights/BookedFlights';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import React from 'react';

class App extends React.Component {
    

  /* useEffect(() => {
    dispatch.onInitFlights(flights);
  }, []); */
    render() {
      

      return (
        <div className="App">
          <TopBar />
          <FlightSelector />
          <hr />
          <BookedFlights />
        </div>
      );
    }

    
}

const mapStateToProps = state => {
  return {
      avFlights: state.availableFlights,
      interDelVal: state.intermediateDelVal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFlights: flights => dispatch({type: actionTypes.INIT_FLIGHTS, flights: flights}),
    onRemoveFlight: (removeId) => dispatch({type: actionTypes.REMOVE_BOOKED_FLIGHT, removeId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
