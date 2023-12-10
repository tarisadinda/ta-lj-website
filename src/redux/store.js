import { configureStore } from "@reduxjs/toolkit"
import alertSlice from "./common/alertSlice"
import modalSlice from "./common/modalSlice"
import userSlice from "./common/userSlice"
import companySlice from "./common/companySlice"
import careerLevelSlice from "./admin/careerLevelSlice"
import { thunk } from "redux-thunk"
import unverifListSlice from "./admin/companySlice"
import qualificationSlice from "./admin/qualificationSlice"

export const store = configureStore({
    reducer: {
        alert: alertSlice,
        modal: modalSlice,
        user: userSlice,
        company: companySlice,
        level: careerLevelSlice,
        unverifList: unverifListSlice,
        qualifications: qualificationSlice
    },
    middleware: [thunk]
})
