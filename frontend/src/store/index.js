import {configureStore} from '@reduxjs/toolkit'
import onPageDivReducer from './slices/onPageDivSlice'
import authReducer from './slices/authSlice'
import loginOrRegisterReducer from './slices/loginOrRegister'
import instructorOrStudentReducer from './slices/instructorOrStudent'
import currentClassPageReducer from './slices/currentClassPage'
import currentSectionReducer from './slices/currentSection'
import hamburgerReducer from './slices/hamburger'

export default configureStore({
    reducer: {
        auth: authReducer,
        onPageDiv: onPageDivReducer,
        loginOrRegister: loginOrRegisterReducer,
        instructorOrStudent: instructorOrStudentReducer,
        currentClassPage: currentClassPageReducer,
        currentSection: currentSectionReducer,
        openOrClose: hamburgerReducer,
    }
})