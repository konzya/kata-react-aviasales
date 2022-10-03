import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    ids: ['all', 'noTransfer', 'transfer1', 'transfer2', 'transfer3'],
    entities: {
      all: {
        name: 'Все',
        checked: false,
      },
      noTransfer: {
        name: 'Без пересадок',
        checked: true,
      },
      transfer1: {
        name: '1 пересадка',
        checked: false,
      },
      transfer2: {
        name: '2 пересадки',
        checked: false,
      },
      transfer3: {
        name: '3 пересадки',
        checked: false,
      },
    },
  },
  reducers: {
    toggleFilter(state, action) {
      const { entities, ids } = state

      if (action.payload === 'all') {
        const checked = !entities.all.checked
        ids.forEach((key) => {
          entities[key].checked = checked
        })
        return
      }

      const checked = !entities[action.payload].checked
      entities[action.payload].checked = checked
      if (checked && ids.slice(1).every((key) => entities[key].checked === true)) {
        entities.all.checked = true
      }
      if (!checked) {
        entities.all.checked = false
      }
    },
  },
})

export const { toggleFilter } = filtersSlice.actions
export const selectFilters = (state) => state.filters.entities
export const selectFiltersIds = (state) => state.filters.ids
export const selectFilterById = (state, id) => state.filters.entities[id]
export default filtersSlice.reducer
