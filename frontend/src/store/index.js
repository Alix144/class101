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

const windowSlice = createSlice({
    name: 'window',
    initialState: { window: 'allClosed' },
    reducers: {
      setWindow: (state, action) => {
        state.window = action.payload;
      },
    },
});

const rootReducer = {
    auth: authSectionSlice.reducer,
    window: windowSlice.reducer,
  };

export const authSection = authSectionSlice.actions;
export const setWindow = windowSlice.actions;

export const store = configureStore({
    reducer: rootReducer,
})