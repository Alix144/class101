import { createSlice } from '@reduxjs/toolkit'

export const currentClassPage = createSlice({
  name: 'currentClassPage',
  initialState: {
    value: "dashboard",
  },
  reducers: {
    setToDashboard: (state) => {
        state.value = "dashboard"
        localStorage.setItem('currentPage', 'dashboard');
    },
    setToAnnouncements: (state) => {
        state.value = "announcements"
        localStorage.setItem('currentPage', 'announcements');
    },
    setToChat: (state) => {
        state.value = "chat"
        localStorage.setItem('currentPage', 'chat');
    },
    setToAssignments: (state) => {
        state.value = "assignments"
        localStorage.setItem('currentPage', 'assignments');
    },
    setToQnA: (state) => {
        state.value = "QnA"
        localStorage.setItem('currentPage', 'QnA');
    },
    setToSyllabus: (state) => {
        state.value = "syllabus"
        localStorage.setItem('currentPage', 'syllabus');
    },
    setToDocuments: (state) => {
        state.value = "documents"
        localStorage.setItem('currentPage', 'documents');
    },
    setToPeople: (state) => {
        state.value = "people"
        localStorage.setItem('currentPage', 'people');
    },
  },
})

export const { setToDashboard, setToAnnouncements, setToChat, setToAssignments, setToQnA, setToSyllabus, setToDocuments, setToPeople } = currentClassPage.actions

export default currentClassPage.reducer