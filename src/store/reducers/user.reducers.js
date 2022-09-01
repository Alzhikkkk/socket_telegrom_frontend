import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    online: [],
    main: []
}


export default function userReducers(state=initialState, action) {
    switch(action.type) {
        case types.SUCCESS_GET_ALL_USERS:
            console.log(action.payload)
            return {...state, online: action.payload};
        case types.FAILURE_GET_ALL_USERS:
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;

        case types.SUCCESS_GET_USER:
            console.log(action.payload)
            return {...state, main: action.payload};
        case types.FAILURE_GET_USER:
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;

        default:
            return state;
    }
}