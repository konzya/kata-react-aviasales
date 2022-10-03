import { configureStore } from '@reduxjs/toolkit'
import filtersReduser from '../features/filters/filtersSlice'
import ticketsReduser from '../features/tickets/ticketsSlice'
import sortsReduser from '../features/sorts/sortsSlice'

const store = configureStore({
  reducer: {
    filters: filtersReduser,
    sorts: sortsReduser,
    tickets: ticketsReduser,
  },
})

export default store
