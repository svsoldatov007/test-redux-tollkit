import { createSelector } from 'reselect'
import * as charactersSelector from '../characters/charactersSelector'
export const searchInput = (state) => state.filters.searchInput

export const firstPrice = (state) => state.filters.firstPrice

export const secondPrice = (state) => state.filters.secondPrice

export const medicine = (state) => state.filters.medicine

export const agressive = (state) => state.filters.agressive

export const filtredCharMassive = createSelector(
  charactersSelector.charMassive,
  searchInput,
  firstPrice,
  secondPrice,
  medicine,
  agressive,
  (charMassive, searchInput, firstPrice, secondPrice, medicine, agressive) => {
    console.log({ searchInput, firstPrice, secondPrice, medicine, agressive })
    return charMassive
      .filter((char) => {
        if (searchInput === '') {
          return char
        }
        return char.name.toLowerCase().includes(searchInput.toLowerCase())
      })
      .filter((char) => {
        if (
          (firstPrice === '' || isNaN(firstPrice)) &&
          (secondPrice === '' || isNaN(firstPrice))
        ) {
          return char
        } else if (firstPrice === '' || isNaN(firstPrice)) {
          return char.price <= secondPrice
        } else if (secondPrice === '' || isNaN(firstPrice)) {
          return firstPrice <= char.price
        } else {
          return firstPrice <= char.price && char.price <= secondPrice
        }
      })
      .filter((char) => {
        if (medicine) {
          return char.medicine === medicine
        }
        return char
      })
      .filter((char) => {
        if (agressive) {
          return char.agressive === agressive
        }
        return char
      })
  }
)
