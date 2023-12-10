import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_QUALIFICATION } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const initialState = {
    loading: false,
    qualification: [],
    error: ''
}

export const fetchQualification = createAsyncThunk('qualification/fetchQualification', () => {
    return axiosInstance.get(API_QUALIFICATION)
    .then((res) => res.data)
    .catch(err => { throw err })
})

const qualificationSlice = createSlice({
    name: 'qualifications',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchQualification.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchQualification.fulfilled, (state, action) => {
            state.loading = false
            state.qualification = action.payload
            state.error = ''
        })
        builder.addCase(fetchQualification.rejected, (state, action) => {
            state.loading = false
            state.qualification = []
            state.error = action.error
        })
    }
})

export const qualificationData = (state) => state.qualifications
export default qualificationSlice.reducer