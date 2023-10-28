import { configureStore } from "@reduxjs/toolkit"
import alertSlice from "./admin/slices/alertSlice"

export const store = configureStore({
    alert: alertSlice,
})