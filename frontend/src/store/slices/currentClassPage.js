import { createSlice } from '@reduxjs/toolkit'

export const currentClassPage = createSlice({
  name: 'currentClassPage',
  initialState: {
    value: "dashboard",
  },
  reducers: {
    setToDashboard: (state) => {
        state.value = "dashboard"
    },
    setToAnnouncements: (state) => {
        state.value = "announcements"
    },
    setToChat: (state) => {
        state.value = "chat"
    },
    setToAssignments: (state) => {
        state.value = "assignments"
    },
    setToQnA: (state) => {
        state.value = "QnA"
    },
    setToSyllabus: (state) => {
        state.value = "syllabus"
    },
    setToDocuments: (state) => {
        state.value = "documents"
    },
    setToPeople: (state) => {
        state.value = "people"
    },
  },
})

export const { setToDashboard, setToAnnouncements, setToChat, setToAssignments, setToQnA, setToSyllabus, setToDocuments, setToPeople } = currentClassPage.actions

export default currentClassPage.reducer