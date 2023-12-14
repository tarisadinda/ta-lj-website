import { configureStore } from "@reduxjs/toolkit"
import alertSlice from "./common/alertSlice"
import modalSlice from "./common/modalSlice"
import userSlice from "./common/userSlice"
import companySlice from "./common/companySlice"
import careerLevelSlice from "./admin/careerLevelSlice"
import { thunk } from "redux-thunk"
import unverifListSlice from "./admin/companySlice"
import qualificationSlice from "./admin/qualificationSlice"
import rolePermissionSlice from "./admin/permissionSlice"
import candidateListSlice from "./company/candidateSlice"
import candidateDetailSlice from "./company/candidateDetailSlice"
import profileSlice from "./candidate/profileSlice"
import jobTypeSlice from "./admin/jobTypeSlice"
import userListSlice from "./common/userListSlice"

export const store = configureStore({
    reducer: {
        alert: alertSlice,
        modal: modalSlice,
        user: userSlice,
        company: companySlice,
        level: careerLevelSlice,
        unverifList: unverifListSlice,
        qualifications: qualificationSlice,
        rolePermission: rolePermissionSlice,
        candidateAppliedList: candidateListSlice,
        candidateDetail: candidateDetailSlice,
        profile: profileSlice,
        jobType: jobTypeSlice,
        userList: userListSlice,
    },
    middleware: [thunk]
})
