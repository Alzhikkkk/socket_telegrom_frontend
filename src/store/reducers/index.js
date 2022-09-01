import {combineReducers} from 'redux';
import RegisterReducers from './register.reducer';
import loginAdminReducers from './loginAdmin.reducers';
import userReducers from './user.reducers';
import messagesReducers from './message.reducers';

export default combineReducers({
    RegisterReducers,
    loginAdminReducers,
    userReducers,
    messagesReducers
})