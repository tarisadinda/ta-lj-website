import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_USERS } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const initialState = {
    loading: false,
    userList: [],
    error: ''
}

export const fetchUserList = createAsyncThunk('job/fetchUserList', ({page, size, role_id}) => {
    return axiosInstance.get(API_USERS, {
        params: {
            size: size,
            page: page,
            role_id: role_id
        },
    }).then((res) => res.data)
    .catch(err => { throw err })
})

const userListSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUserList.fulfilled, (state, action) => {
            state.loading = false
            state.userList = action.payload
            state.error = ''
        })
        builder.addCase(fetchUserList.rejected, (state, action) => {
            state.loading = false
            state.userList = []
            state.error = 'Fetching error'
        })
    }
})

export const userListData = (state) => state.userList
export default userListSlice.reducer