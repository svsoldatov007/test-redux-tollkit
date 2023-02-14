import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchInput: '',
  firstPrice: '',
  secondPrice: '',
  medicine: false,
  agressive: false,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeSearchInput: (state, action) => {
      state.searchInput = action.payload
    },
    changeFirstPrice: (state, action) => {
      if (action.payload === '') {
        state.firstPrice = ''
      } else {
        state.firstPrice = parseInt(action.payload)
      }
    },
    changeSecondPrice: (state, action) => {
      if (action.payload === '') {
        state.secondPrice = ''
      } else {
        state.secondPrice = parseInt(action.payload)
      }
    },
    changeMedicine: (state, action) => {
      state.medicine = action.payload
    },
    changeAgressive: (state, action) => {
      console.log(action.payload)
      state.agressive = action.payload
    },
    resetFilters: (state) => {
      state.searchInput = ''
      state.firstPrice = ''
      state.secondPrice = ''
      state.medicine = false
      state.agressive = false
    },
  },
})

const { actions, reducer } = filtersSlice
export const {
  changeSearchInput,
  changeFirstPrice,
  changeSecondPrice,
  changeMedicine,
  changeAgressive,
  resetFilters,
} = actions
export default reducer
