import { createSlice } from '@reduxjs/toolkit'

export const hamburgerSlice = createSlice({
    name: "openOrClose",
    initialState: {
        isOpen: false
    },
    reducers: {
        setToClose: (state) => {
            state.isOpen = false
        },
        setToOpen: (state) => {
            state.isOpen = true
        },
    },
})

export const { setToOpen, setToClose } = hamburgerSlice.actions

export default hamburgerSlice.reducer