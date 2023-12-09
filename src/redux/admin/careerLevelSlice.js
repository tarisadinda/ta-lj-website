import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_CAREER_LEVEL } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const initialState = {
    loading: false,
    levels: [],
    error: ''
}

export const fetchCareerLevel = createAsyncThunk('level/fetchCareerLevel', (page) => {
    return axiosInstance.get(API_CAREER_LEVEL, {
            params: {
                size: 5,
                page: page
            },
        }).then((res) => res.data)
        .catch(err => { throw err })
})

const careerLevelSlice = createSlice({
    name: 'level',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCareerLevel.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCareerLevel.fulfilled, (state, action) => {
            state.loading = false
            state.levels = action.payload
            state.error = ''
        })
        builder.addCase(fetchCareerLevel.rejected, (state, action) => {
            state.loading = false
            state.levels = []
            state.error = 'Fetching error'
        })
    }
})

export const careerLevelData = (state) => state.level
export default careerLevelSlice.reducer