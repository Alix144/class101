import {configureStore} from '@reduxjs/toolkit'
import onPageDivReducer from './slices/onPageDivSlice'
import authReducer from './slices/authSlice'
import loginOrRegisterReducer from './slices/loginOrRegister'

export default configureStore({
    reducer: {
        auth: authReducer,
        onPageDiv: onPageDivReducer,
        loginOrRegister: loginOrRegisterReducer,
    }
})