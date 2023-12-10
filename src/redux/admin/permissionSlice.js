import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_ROLE_PERMISSION } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const initialState = {
    loading: false,
    permissionData: [],
    error: ''
}

export const fetchRolePermission = createAsyncThunk('permission/fetchRolePermission', (page) => {
    return axiosInstance.get(API_ROLE_PERMISSION)
        .then((res) => res.data)
        .catch(err => { throw err })
})

const rolePermissionSlice = createSlice({
    name: 'rolePermission',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRolePermission.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchRolePermission.fulfilled, (state, action) => {
            state.loading = false
            state.permissionData = action.payload
            state.error = ''
        })
        builder.addCase(fetchRolePermission.rejected, (state, action) => {
            state.loading = false
            state.permissionData = []
            state.error = action.error
        })
    }
})

export const rolePermissionList = (state) => state.rolePermission;
export default rolePermissionSlice.reducer;