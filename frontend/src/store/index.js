import {configureStore} from '@reduxjs/toolkit'
import onPageDivReducer from './slices/onPageDivSlice'
import authReducer from './slices/authSlice'
import loginOrRegisterReducer from './slices/loginOrRegister'
import currentClassPageReducer from './slices/currentClassPage'

export default configureStore({
    reducer: {
        auth: authReducer,
        onPageDiv: onPageDivReducer,
        loginOrRegister: loginOrRegisterReducer,
        currentClassPage: currentClassPageReducer,
    }
})