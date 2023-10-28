import { configureStore } from "@reduxjs/toolkit"
import alertSlice from "./common/alertSlice"
import modalSlice from "./common/modalSlice"

export const store = configureStore({
    reducer: {
        alert: alertSlice,
        modal: modalSlice
    }
})