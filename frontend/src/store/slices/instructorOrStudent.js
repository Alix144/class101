import { createSlice } from '@reduxjs/toolkit'

export const instructorOrStudent = createSlice({
    name: "instructorOrStudent",
    initialState: {
        isInstructor: false
    },
    reducers: {
        setToInstructor: (state) => {
            state.isInstructor = true
        },
        setToStudent: (state) => {
            state.isInstructor = false
        },
    },
})

export const { setToInstructor, setToStudent } = instructorOrStudent.actions

export default instructorOrStudent.reducer