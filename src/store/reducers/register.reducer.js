import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    user: []
}


export default function RegisterReducers(state=initialState, action) {
    switch(action.type) {
        case types.CREATE_USER: 
            return {...state, isLoading: true}
        case types.RECIEVED_NEW_USER: 
            return {...state, isLoading: false, user: [...state.user, action.payload]}      
        case types.FAILURE_CREATE_USER:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};

        default:
            return state;
        }
    }