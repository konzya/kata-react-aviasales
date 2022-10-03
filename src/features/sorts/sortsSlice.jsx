import { createSlice } from '@reduxjs/toolkit'

const shy = String.fromCharCode(173)

const filtersSlice = createSlice({
  name: 'sorts',
  initialState: {
    ids: ['cheapest', 'fasterst', 'optimal'],
    entities: {
      cheapest: {
        name: 'Самый дешевый',
        active: true,
      },
      fasterst: {
        name: 'Самый быстрый',
        active: false,
      },
      optimal: {
        name: `Опти${shy}мальный`,
        active: false,
      },
    },
  },
  reducers: {
    chooseSort(state, action) {
      const key = action.payload
      state.ids.forEach((id) => {
        state.entities[id].active = false
      })
      state.entities[key].active = true
    },
  },
})

export const { chooseSort } = filtersSlice.actions
export const selectSorts = (state) => state.sorts.entities
export const selectSortsIds = (state) => state.sorts.ids
export const selectSortById = (state, id) => state.sorts.entities[id]
export const selectActiveSortId = (state) => state.sorts.ids.find((id) => state.sorts.entities[id].active)

export default filtersSlice.reducer
