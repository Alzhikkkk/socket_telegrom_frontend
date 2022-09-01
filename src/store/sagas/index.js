import {all} from 'redux-saga/effects';
import { loginAdminSagas } from './loginAdminSagas';
import { messageSagas } from './messageSagas';
import { registerSagas } from './registerSagas';
import { userSagas } from './userSagas';

export default function* rootSaga(){
    yield all([
        registerSagas(),
        loginAdminSagas(),
        userSagas(),
        messageSagas(),
    ])
}