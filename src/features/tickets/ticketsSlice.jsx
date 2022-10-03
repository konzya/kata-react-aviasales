import { createSelector, createSlice } from '@reduxjs/toolkit'
import aviasalesApi from '../../aviasalesApi'
import { selectFilters } from '../filters/filtersSlice'
import { selectActiveSortId } from '../sorts/sortsSlice'
import { filterTickets, sortTickets } from '../../helpers'

export const TicketsStatusEnum = {
  idle: 'idle',
  fetching: 'fetching',
  done: 'done',
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    status: TicketsStatusEnum.idle,
    array: [],
  },
  reducers: {
    startFetching(state) {
      state.status = TicketsStatusEnum.fetching
    },
    doneFetching(state) {
      state.status = TicketsStatusEnum.done
    },
    ticketsRecieved(state, action) {
      state.array.push(...action.payload)
    },
  },
})

export const { startFetching, doneFetching, ticketsRecieved } = ticketsSlice.actions

export const selectAllTickets = (state) => state.tickets.array
export const selectTicketsStatus = (state) => state.tickets.status
export const selectFilteredSortedTickets = createSelector(
  [selectAllTickets, selectFilters, selectActiveSortId],
  (tickets, filters, sortId) => {
    const filteredTickets = filterTickets(tickets, filters)
    const sortedTickets = sortTickets(filteredTickets, sortId)
    return sortedTickets
  }
)

export default ticketsSlice.reducer

export const fetchTickets = async (dispatch, getState) => {
  const { status } = getState().tickets
  if (status !== TicketsStatusEnum.idle) return
  dispatch(startFetching())
  let searchId = null
  while (!searchId) {
    try {
      // eslint-disable-next-line no-await-in-loop
      searchId = await aviasalesApi.getSearchId()
    } catch (e) {
      console.error(e)
    }
  }
  let stop = false
  while (!stop) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await aviasalesApi.getTickets(searchId)
      stop = response.stop
      dispatch(ticketsRecieved(response.tickets))
    } catch (e) {
      console.error(e)
    }
  }
  dispatch(doneFetching())
}
