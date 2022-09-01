import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from "../../config/baseurl"

function* addMessage({from, to, message, roomId}){
    console.log(from)
    console.log(to)
    console.log(message)
    console.log("URAAA");
    try{
        const messages = yield  axios.post(`${BASE_URL}/addmsg/`, {from, to, message, roomId}).then(res => res.data);
        yield put({type:types.RECIEVED_ADD_MESSAGES, payload : messages})
    }catch(e){
        yield put({type: types.FAILURE_ADD_MESSAGES , errors: e})
    }
}


function* getMessages({from, to}){
    try{
        const messages = yield  axios.post(`${BASE_URL}/getmsg/`, {from, to}).then(res => res.data);
        console.log(messages);
        yield put({type:types.SUCCESS_GET_MESSAGES, payload : messages})
    }catch(e){
        yield put({type: types.FAILURE_GET_MESSAGES , errors: e})
    }
}


function* getMessagesByRoom({from, roomId}){
    try{
        const messages = yield  axios.post(`${BASE_URL}/getmsg/room/`, {from, roomId}).then(res => res.data);
        console.log(messages);
        yield put({type:types.SUCCESS_GET_MESSAGES_ROOM, payload : messages})
    }catch(e){
        yield put({type: types.FAILURE_GET_MESSAGES_ROOM , errors: e})
    }
}

export function* messageSagas(){
    yield all([
        yield takeLatest(types.ADD_MESSAGES, addMessage),
        yield takeLatest(types.GET_MESSAGES, getMessages),
        yield takeLatest(types.GET_MESSAGES_ROOM, getMessagesByRoom),
    ])
}