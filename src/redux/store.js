import { configureStore } from "@reduxjs/toolkit"
import alertSlice from "./common/alertSlice"
import modalSlice from "./common/modalSlice"
import userSlice from "./common/userSlice"
import companySlice from "./common/companySlice"

export const store = configureStore({
    reducer: {
        alert: alertSlice,
        modal: modalSlice,
        user: userSlice,
        company: companySlice
    }
})