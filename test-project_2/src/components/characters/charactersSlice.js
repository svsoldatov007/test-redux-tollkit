import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

export const fetchAllCharachers = createAsyncThunk(
  'characters/fetchAllCharachers',
  async ({ rejectWithValue }) => {
    try {
      const { request } = useHttp()
      return await request(`characters`)
    } catch (error) {
      return rejectWithValue('Не удалось загрузить карточки с породами(')
    }
  }
)

export const addOneCharacter = createAsyncThunk(
  'characters/addOneCharacter',
  async (char, { rejectWithValue, dispatch, getState }) => {
    // метод getState обращается к глобальному стейту, чтобы работать с ним прямо из слайса
    const active = getState().characters.characterActive

    try {
      const { request } = useHttp()
      request(`characters`, 'POST', JSON.stringify(char))
        .then((data) => {
          dispatch(addCharacter(char))
        })
        .catch((error) => {
          throw new Error(`Can't add new character. Server error`)
        })
    } catch (error) {
      return rejectWithValue('Не удалось добавить новую породу(')
    }
  }
)

export const deleteOneCharacter = createAsyncThunk(
  'characters/deleteOneCharacter',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { request } = useHttp()
      request(`characters/${id}`, 'DELETE')
        .then(() => {
          dispatch(deleteCharacter(id))
          dispatch(setCharacterActive(null))
        })
        .catch((error) => {
          throw new Error(`Can't delete character. Server error`)
        })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  charMassive: [],
  charactersStatus: 'idle',
  deletedCharStatus: 'idle',
  addedCharStatus: 'idle',
  characterActive: null,
}

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacterActive: (state, action) => {
      state.characterActive = action.payload
    },
    deleteCharacter: (state, action) => {
      state.charMassive = state.charMassive.filter(
        (char) => char.id !== action.payload
      )
    },
    addCharacter: (state, action) => {
      state.charMassive.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCharachers.pending, (state) => {
        state.charactersStatus = 'loading'
      })
      .addCase(fetchAllCharachers.rejected, (state, action) => {
        state.charactersStatus = 'error'
        state.error = action.payload
      })
      .addCase(fetchAllCharachers.fulfilled, (state, action) => {
        state.charMassive = action.payload
        state.charactersStatus = 'idle'
      })
      .addCase(addOneCharacter.fulfilled, (state, action) => {
        state.charactersStatus = 'idle'
      })
      .addCase(addOneCharacter.rejected, (state, action) => {
        state.addedCharStatus = 'error'
        state.error = action.payload
      })
      .addCase(deleteOneCharacter.rejected, (state, action) => {
        state.deletedCharStatus = 'error'
        state.error = action.payload
      })
  },
})

export const { setCharacterActive, deleteCharacter, addCharacter } =
  charactersSlice.actions
export default charactersSlice.reducer
