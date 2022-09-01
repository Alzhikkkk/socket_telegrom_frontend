import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';


function* createUser({email, full_name, nickname, password, password1, avatar}){
    try{
        console.log("URAA"+email)
        const user = yield axios.post(`${BASE_URL}/api/auth/signup`, {email, full_name, nickname, password, password1, avatar}, {headers: {"Content-Type": "multipart/form-data"}}).then(res => res.data);
        console.log(user);
        yield put({type:types.RECIEVED_NEW_USER, payload : user })
    }catch(e){
        yield put({type: types.FAILURE_CREATE_USER, errors: e})
    }
}

export function* registerSagas(){
    yield all([
        yield takeLatest(types.CREATE_USER, createUser),
    ])
}