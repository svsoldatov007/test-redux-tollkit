import { configureStore } from '@reduxjs/toolkit'
import characters from '../components/characters/charactersSlice'
import modals from '../components/modals/modalsSlice'

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    })
  }
  return next(action)
}

// глобальное хранилище, в котором хранятся необходимые данные для взаимодействия между разными компонентами
// characters, modals - reducers из разных файлов
const store = configureStore({
  reducer: { characters, modals },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
