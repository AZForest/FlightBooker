import React from 'react';
import './BookedFlights.css';
import BookedFlight from '../../components/BookedFlight/BookedFlight';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Modal from '../../components/Modal/Modal';
import axios from 'axios';

class BookedFlights extends React.Component {
    state = {
        modalVisible: false,
        removeId: null
    }

    componentDidMount() {
        axios.get('https://peaceful-hollows-15789.herokuapp.com/BookedFlights')
        .then(response => {
            this.props.onInitBookedFlights(response);
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }
    componentDidUpdate() {
        console.log("update");
        axios.get('https://peaceful-hollows-15789.herokuapp.com/BookedFlights')
        .then(response => {
            console.log(response.data.length, this.props.bFlights.length);
            if (this.props.bFlights.length !== response.data.length) {
                console.log("updating...");
                this.props.onInitBookedFlights(response);
            }
        })
    }

    setModalVisible(removeId) {
        this.setState({modalVisible: !this.state.modalVisible, removeId: removeId});
    }

    deleteFlight() {

        axios.delete('https://peaceful-hollows-15789.herokuapp.com/BookedFlights', { data: { id: this.state.removeId }})
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
        axios.get('https://peaceful-hollows-15789.herokuapp.com/BookedFlights')
        .then(response => {
            this.props.onInitBookedFlights(response);
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })

        this.setState({modalVisible: !this.state.modalVisible, removeId: null})
    }

    thirdFunction() {
        this.setState({modalVisible: !this.state.modalVisible, removeId: null})
    }

    render() {
        
        let removeBookedFlightMsg = <p>Are you sure you want to remove flight?</p>;
        let modal = "";
        if (this.state.modalVisible) {
            modal = <Modal message={removeBookedFlightMsg} click={() => this.deleteFlight()} negativeClick={() => this.thirdFunction()}/>
        }
        
        let renderedFlights = "";
        if (this.props.bFlights !== "Empty") {
            renderedFlights = this.props.bFlights.map((el, i) => {
                return <BookedFlight 
                            carrier={el.carrier}
                            dCity={el.dCity}
                            aCity={el.aCity}
                            date={el.date}
                            passengers={el.passengers}
                            bags={el.bags}
                            carryOn={el.carryOn}
                            totalPrice={el.totalPrice}
                            key={el.id}
                            click={() => this.setModalVisible(el.id)}
                            />
            })
        }

        return (
            <div className="BookedFlights">
                {modal}
                <h1>Booked Flights</h1>
                <div style={{paddingTop: "55px", paddingBottom: "10px"}}>{renderedFlights}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bFlights: state.bookedFlights
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onRemoveFlight: (removeId) => dispatch({type: actionTypes.REMOVE_BOOKED_FLIGHT, removeId}),
        onInitBookedFlights: (flights) => dispatch({type: actionTypes.INIT_BOOKED_FLIGHTS, flights})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookedFlights);