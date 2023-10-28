import { createSlice } from "@reduxjs/toolkit"

const alertState = {
    openAlert: false,
    message: '',
    severity: 'success'
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState: alertState,
    reducers: {
        setOpenAlert(state, action) {
            state.openAlert = action.payload
        },
        setMessage(state, action) {
            state.message = action.payload
        },
        setSeverity(state, action) {
            state.severity = action.payload
        }
    }
})

export const { setOpenAlert, setMessage, setSeverity } = alertSlice.actions

export const openAlert = (state) => state.alert.openAlert
export const alertMessage = (state) => state.alert.message
export const severity = (state) => state.alert.severity

export default alertSlice.reducer