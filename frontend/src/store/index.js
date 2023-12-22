import {configureStore} from '@reduxjs/toolkit'
import onPageDivReducer from './slices/onPageDivSlice'
import authReducer from './slices/authSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        onPageDiv: onPageDivReducer,
    }
})