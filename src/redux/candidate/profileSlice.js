import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_USER_DETAIL } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const profileState = {
    loading: false,
    profile: [],
    error: ''
}

export const fetchProfile = createAsyncThunk('candidate/fetchProfile', () => {
    return axiosInstance.get(API_USER_DETAIL)
        .then((res) => res.data)
        .catch(err => { throw err })
})

const profileSlice = createSlice({
    name: 'profile',
    initialState: profileState,
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false
            state.profile = action.payload
            state.error = ''
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false
            state.profile = []
            state.error = action.error
        })
    }
})

export const profileData = (state) => state.profile;
export default profileSlice.reducer;