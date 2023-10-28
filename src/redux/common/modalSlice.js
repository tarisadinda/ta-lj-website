import { createSlice } from "@reduxjs/toolkit"

const modalState = {
    openModal: false,
    isDelete: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: modalState,
    reducers: {
        setOpenModal(state, action) {
            state.openModal = action.payload
        },
        setIsDelete(state, action) {
            state.isDelete = action.payload
        }
    }
})


export const { setOpenModal, setIsDelete } = modalSlice.actions

export const openModal = (state) => state.modal.openModal
export const isDelete = (state) => state.modal.isDelete 

export default modalSlice.reducer