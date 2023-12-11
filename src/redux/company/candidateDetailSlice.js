import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_CANDIDATE_JOB } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const candidateDetailState = {
    loading: false,
    dataCandidate: [],
    error: ''
}

export const fetchDetailCandidate = createAsyncThunk('candidate/fetchDetailCandidate', (userId) => {
    return axiosInstance.get(`${API_CANDIDATE_JOB}/detail/${userId}`)
        .then((res) => res.data)
        .catch(err => { throw err })
})

const candidateDetailSlice = createSlice({
    name: 'candidateDetail',
    initialState: candidateDetailState,
    extraReducers: (builder) => {
        builder.addCase(fetchDetailCandidate.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchDetailCandidate.fulfilled, (state, action) => {
            state.loading = false
            state.dataCandidate = action.payload
            state.error = ''
        })
        builder.addCase(fetchDetailCandidate.rejected, (state, action) => {
            state.loading = false
            state.dataCandidate = []
            state.error = action.error
        })
    }
})

export const candidateDetailData = (state) => state.candidateDetail;
export default candidateDetailSlice.reducer;