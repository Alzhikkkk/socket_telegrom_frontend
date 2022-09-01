import * as types from './types';

export function getMessages(data){
    return {type: types.GET_MESSAGES, ...data}
}

export function getMessagesByRoom(data){
    return {type: types.GET_MESSAGES_ROOM, ...data}
}


export function addMessage(data){
    return {type: types.ADD_MESSAGES, ...data}
}