import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_JOB_TYPE } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const initialState = {
    loading: false,
    jobType: [],
    error: ''
}

export const fetchJobType = createAsyncThunk('job/fetchJobType', () => {
    return axiosInstance.get(API_JOB_TYPE)
        .then((res) => res.data)
        .catch(err => { throw err })
})

const jobTypeSlice = createSlice({
    name: 'jobType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchJobType.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchJobType.fulfilled, (state, action) => {
            state.loading = false
            state.jobType = action.payload
            state.error = ''
        })
        builder.addCase(fetchJobType.rejected, (state, action) => {
            state.loading = false
            state.jobType = []
            state.error = action.error
        })
    }
})

export const jobTypeData = (state) => state.jobType
export default jobTypeSlice.reducer