import * as actionTypes from './actions';

const initialState = {
    availableFlights: null,
    selectedFlight: null,
    options: {passengers: 1, bags: 0, carryOn: 0, class: "coach"},
    classPriceAdded: false,
    totalPrice: 0,
    bookedFlights: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_FLIGHTS:
            return {
                ...state,
                availableFlights: action.flightData.data
            }  
        case actionTypes.ADD_FLIGHT: 
            const addFlight = {
                carrier: action.flightData.carrier,
                dCity: action.flightData.dCity,
                aCity: action.flightData.aCity,
                date: action.flightData.date,
                price: action.flightData.price
            }
            return {
                ...state,
                selectedFlight: addFlight,
                options: {passengers: 1, bags: 0, carryOn: 0, class: "Coach"},
                classPriceAdded: false,
                totalPrice: action.flightData.price
            }
        case actionTypes.REMOVE_FLIGHT:
            console.log("Removed");
            return {
                ...state,
                selectedFlight: null,
                options: {passengers: 1, bags: 0, carryOn: 0, class: "Coach"},
                classPriceAdded: false,
                totalPrice: 0
            }

        case actionTypes.PASSENGER_INCREMENT:
            let val = Object.values(state.options);
            val[0] += 1;
            let flightPrice = state.totalPrice;
            flightPrice = flightPrice + state.selectedFlight.price;
            return {
                ...state,
                options: {passengers: val[0], bags: val[1], carryOn: val[2], class: val[3]},
                totalPrice: flightPrice
            }
        case actionTypes.PASSENGER_DECREMENT:
            let values = Object.values(state.options);
            if (values[0] > 0) {
                values[0] -= 1;
            }
            let flightPrice2 = state.totalPrice;
            flightPrice2 -= state.selectedFlight.price;
            return {
                ...state,
                options: {passengers: values[0], bags: values[1], carryOn: values[2], class: values[3]},
                totalPrice: flightPrice2
            }

        case actionTypes.BAG_INCREMENT:
            let v = Object.values(state.options);
            v[1] += 1;
            return {
                ...state,
                options: {passengers: v[0], bags: v[1], carryOn: v[2], class: v[3]},
                totalPrice: state.totalPrice + 50
            }
        case actionTypes.BAG_DECREMENT:
            let va = Object.values(state.options);
            if (va[1] > 0) {
                va[1] -= 1;
            }
            return {
                ...state,
                options: {passengers: va[0], bags: va[1], carryOn: va[2], class: va[3]},
                totalPrice: state.totalPrice - 50
            }

        case actionTypes.CARRYON_INCREMENT:
            let valu = Object.values(state.options);
            valu[2] += 1;
            return {
                ...state,
                options: {passengers: valu[0], bags: valu[1], carryOn: valu[2], class: valu[3]},
                totalPrice: state.totalPrice + 30
            }
        case actionTypes.CARRYON_DECREMENT:
            let value2 = Object.values(state.options);
            if (value2[2] > 0) {
                value2[2] -= 1;
            }
            return {
                ...state,
                options: {passengers: value2[0], bags: value2[1], carryOn: value2[2], class: value2[3]},
                totalPrice: state.totalPrice - 30
            }
        case actionTypes.SET_CLASS: 
            let value3 = Object.values(state.options);
            let classPrice = 0;
            if (!state.classPriceAdded) {
                if (action.val === "First") {
                    classPrice = 200;
                } else if (action.val === "Second") {
                    classPrice = 100;
                }
            } else {
                let currentSelection = action.val;
                if (currentSelection === 'Coach') {
                    if (state.options.class === "Second") {
                        classPrice -= 100;
                    } else {
                        classPrice -= 200;
                    }
                }
                if (currentSelection === 'Second') {
                    if (state.options.class === "Coach") {
                        classPrice += 100;
                    } else {
                        classPrice -= 100;
                    }
                }
                if (currentSelection === 'First') {
                    if (state.options.class === "Coach") {
                        classPrice += 200;
                    } else {
                        classPrice += 100;
                    }
                }
            }
            
            return {
                ...state,
                options: {passengers: value3[0], bags: value3[1], carryOn: value3[2], class: action.val},
                classPriceAdded: true,
                totalPrice: state.totalPrice + (classPrice * value3[0])
            }
        case actionTypes.UPDATE_PRICE:
            let tPrice = state.totalPrice;
            tPrice += action.value
            return {
                ...state,
                totalPrice: tPrice
            }
        case actionTypes.BOOK_FLIGHT:
            return {
                ...state,
                selectedFlight: null,
                options: {passengers: 1, bags: 0, carryOn: 0, class: "coach"},
                classPriceAdded: false,
                totalPrice: 0
            }
        case actionTypes.REMOVE_BOOKED_FLIGHT:
            return {
                ...state,
                bookedFlights: state.bookedFlights.filter(flight => flight.id !== action.removeId)
            }
        case actionTypes.INIT_BOOKED_FLIGHTS:
            return {
                ...state,
                bookedFlights: action.flights.data
            }
    }
    return state;
}

export default reducer;

