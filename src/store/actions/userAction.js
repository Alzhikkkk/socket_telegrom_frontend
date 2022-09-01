import * as types from './types';

export function getAllUsers({id}){
    return {type: types.GET_ALL_USERS, id}
}

export function getUserById({id}){
    return {type: types.GET_USER, id}
}