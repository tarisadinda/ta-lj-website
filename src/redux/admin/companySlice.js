import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_VERIF_COMPANY } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const initialState = {
    loading: false,
    unverifData: [],
    error: ''
}

export const fetchUnverifList = createAsyncThunk('company/fetchUnverifList', (page) => {
    return axiosInstance.get(API_VERIF_COMPANY, {
            params: {
                size: 10,
                page: page
            },
        }).then((res) => res.data)
        .catch(err => { throw err })
})

const unverifListSlice = createSlice({
    name: 'unverifList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUnverifList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUnverifList.fulfilled, (state, action) => {
            state.loading = false
            state.unverifData = action.payload
            state.error = ''
        })
        builder.addCase(fetchUnverifList.rejected, (state, action) => {
            state.loading = false
            state.unverifData = []
            state.error = action.error
        })
    }
})

export const unverifCompanyList = (state) => state.unverifList;
export default unverifListSlice.reducer;