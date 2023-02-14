import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAddCharModal: false,
  addModal: {
    name: '',
    img: '',
    description: '',
    medicine: null,
    agressive: null,
    price: null,
  },
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showAddCharModal: (state) => {
      state.isAddCharModal = true
    },
    closeAddCharModal: (state) => {
      state.isAddCharModal = false
    },

    // при изменении объекта в initialState нужно непосредственно изменять его!
    // запись state.addModal.name = action.payload возвращает ошибку
    changeNameCharModal: (state, action) => {
      state.addModal = { ...state.addModal, name: action.payload }
    },
    changeImgCharModal: (state, action) => {
      state.addModal = { ...state.addModal, img: action.payload }
    },
    changeDescriptionCharModal: (state, action) => {
      state.addModal = { ...state.addModal, description: action.payload }
    },
    changeMedicineCharModal: (state, action) => {
      state.addModal = { ...state.addModal, medicine: action.payload }
    },
    changeAgressiveCharModal: (state, action) => {
      state.addModal = { ...state.addModal, agressive: action.payload }
    },
    changePriceCharModal: (state, action) => {
      state.addModal = { ...state.addModal, price: action.payload }
    },
    resetForm: (state) => {
      state.addModal = {}
    },
  },
})

const { actions, reducer } = modalsSlice
export const { showAddCharModal, closeAddCharModal } = actions
export const {
  changeNameCharModal,
  changeImgCharModal,
  changeDescriptionCharModal,
  changeMedicineCharModal,
  changeAgressiveCharModal,
  changePriceCharModal,
  resetForm,
} = actions
export default reducer
