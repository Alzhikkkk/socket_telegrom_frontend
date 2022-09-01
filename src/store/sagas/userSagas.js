import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from "../../config/baseurl"


function* getAllUsers({id}){
    try{
        const user = yield axios.get(`${BASE_URL}/api/auth/allusers/${id}`).then(res => res.data);
        // console.log(user);
        yield put({type:types.SUCCESS_GET_ALL_USERS, payload : user })
    }catch(e){
        yield put({type: types.FAILURE_GET_ALL_USERS, errors: e})
    }
}

function* getUserById({id}){
    try{
        const user = yield axios.get(`${BASE_URL}/api/users/${id}`).then(res => res.data);
        console.log(user);
        yield put({type:types.SUCCESS_GET_USER, payload : user })
    }catch(e){
        yield put({type: types.FAILURE_GET_USER, errors: e})
    }
}




export function* userSagas(){
    yield all([
        yield takeLatest(types.GET_ALL_USERS, getAllUsers),
        yield takeLatest(types.GET_USER, getUserById),
    ])
}