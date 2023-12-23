import { createSlice } from '@reduxjs/toolkit'

export const onPageDivSlice = createSlice({
  name: 'onPageDiv',
  initialState: {
    value: "",
  },
  reducers: {
    clearOnPageDiv: (state) => {
        state.value = ""
    },
    setOnPageDiv: (state) => {
        state.value = "whaaaaaat"
    },
  },
})

export const { clearOnPageDiv, setOnPageDiv } = onPageDivSlice.actions

export default onPageDivSlice.reducer