import { createSlice } from '@reduxjs/toolkit'

export const currentSection = createSlice({
  name: 'currentSection',
  initialState: {
    value: "home",
  },
  reducers: {
    setToNull: (state) => {
        state.value = ""
    },
    setToHome: (state) => {
        state.value = "home"
    },
    setToCalendar: (state) => {
        state.value = "calendar"
    },
    setToToDo: (state) => {
        state.value = "toDo"
    },
    setToClassT: (state) => {
        state.value = "classT"
    },
    setToClassS: (state) => {
        state.value = "classS"
    },

  },
})

export const {  setToNull, setToHome, setToCalendar, setToToDo, setToClassT, setToClassS } = currentSection.actions

export default currentSection.reducer