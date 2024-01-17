import { createSlice } from '@reduxjs/toolkit'

export const instructorOrStudent = createSlice({
    name: "instructorOrStudent",
    initialState: {
        isInstructor: false
    },
    reducers: {
        setToInstructor: (state) => {
            state.isInstructor = true
            localStorage.setItem('role', 'instructor');
        },
        setToStudent: (state) => {
            state.isInstructor = false
            localStorage.setItem('role', 'student');
        },
    },
})

export const { setToInstructor, setToStudent } = instructorOrStudent.actions

export default instructorOrStudent.reducer