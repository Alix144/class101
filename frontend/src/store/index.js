import {configureStore, createSlice} from '@reduxjs/toolkit'


const authSectionSlice = createSlice({
    name: "auth",
    initialState: {section: false},
    reducers: {
        sectionLogin(state){
            state.section = true
        },
        sectionRegister(state){
            state.section = false
        }
    }
})

export const authSection = authSectionSlice.actions;

export const store = configureStore({
    reducer: authSectionSlice.reducer
})