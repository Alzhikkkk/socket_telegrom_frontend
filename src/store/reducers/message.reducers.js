import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    messages: []
}


export default function messagesReducers(state=initialState, action) {
    switch(action.type) {
        case types.SUCCESS_GET_MESSAGES: 
            return {...state, messages: action.payload};
        case types.FAILURE_GET_MESSAGES:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;

        case types.SUCCESS_GET_MESSAGES_ROOM: 
            return {...state, messages: action.payload};
        case types.FAILURE_GET_MESSAGES_ROOM:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;


        case types.ADD_MESSAGES: 
            return {...state, isLoading: true}
        case types.RECIEVED_NEW_USER: 
            return {...state, isLoading: false, messages: [...state.messages, action.payload]}      
        case types.FAILURE_GET_ALL_USERS:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};
        default:
            return state;
    }
}

