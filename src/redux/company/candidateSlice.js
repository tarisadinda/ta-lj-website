import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_CANDIDATE_JOB } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const initialState = {
    loading: false,
    candidateList: [],
    error: ''
}

export const fetchCandidateApplied = createAsyncThunk('candidate/fetchCandidateApplied', (page, type_request) => {
    return axiosInstance.get(API_CANDIDATE_JOB, {
            params: {
                size: 10,
                page: page,
                type_request: type_request
            },
        }).then((res) => res.data)
        .catch(err => { throw err })
})

const candidateListSlice = createSlice({
    name: 'candidateAppliedList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCandidateApplied.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCandidateApplied.fulfilled, (state, action) => {
            state.loading = false
            state.candidateList = action.payload
            state.error = ''
        })
        builder.addCase(fetchCandidateApplied.rejected, (state, action) => {
            state.loading = false
            state.candidateList = []
            state.error = action.error
        })
    }
})

export const candidateAppliedList = (state) => state.candidateAppliedList;
export default candidateListSlice.reducer;