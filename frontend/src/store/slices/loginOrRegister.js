import { createSlice } from '@reduxjs/toolkit'

export const loginOrRegisterSlice = createSlice({
    name: "registerOrLogin",
    initialState: {
        isRegister: false
    },
    reducers: {
        setToLogin: (state) => {
            state.isRegister = false
        },
        setToRegister: (state) => {
            state.isRegister = true
        },
    },
})

export const { setToLogin, setToRegister } = loginOrRegisterSlice.actions

export default loginOrRegisterSlice.reducer