import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAddCharModal: false,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showAddCharModal: (state, action) => {
      state.isAddCharModal = true
    },
    closeAddCharModal: (state, action) => {
      state.isAddCharModal = false
    },
  },
})

const { actions, reducer } = modalsSlice
export const { showAddCharModal, closeAddCharModal } = actions
export default reducer
