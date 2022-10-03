import { format, parseISO, addMinutes, intervalToDuration } from 'date-fns'

export function getFlyingTime(start, duration) {
  const startDate = parseISO(start)
  const arriveDate = addMinutes(startDate, duration)
  const timePeriod = `${format(startDate, 'HH:mm')} - ${format(arriveDate, 'HH:mm')}`
  const { days, hours, minutes } = intervalToDuration({ start: startDate, end: arriveDate })
  const inAir = `${days * 24 + hours}ч ${minutes ? `${minutes}м` : ''}`
  return {
    timePeriod,
    inAir,
  }
}

export function filterTickets(ticketsRef, filters) {
  const tickets = JSON.parse(JSON.stringify(ticketsRef))
  const answer = []
  if (filters.all.checked) return tickets

  if (filters.noTransfer.checked)
    answer.push(...tickets.filter((ticket) => ticket.segments.every((segment) => segment.stops.length === 0)))
  if (filters.transfer1.checked)
    answer.push(...tickets.filter((ticket) => ticket.segments.every((segment) => segment.stops.length === 1)))
  if (filters.transfer2.checked)
    answer.push(...tickets.filter((ticket) => ticket.segments.every((segment) => segment.stops.length === 2)))
  if (filters.transfer3.checked)
    answer.push(...tickets.filter((ticket) => ticket.segments.every((segment) => segment.stops.length === 3)))

  return answer
}

export function sortTickets(ticketsRef, sortId) {
  const tickets = JSON.parse(JSON.stringify(ticketsRef))
  if (sortId === 'cheapest') tickets.sort((a, b) => a.price - b.price)
  if (sortId === 'fasterst')
    tickets.sort(
      (a, b) =>
        a.segments.reduce((acc, segment) => acc + segment.duration, 0) -
        b.segments.reduce((acc, segment) => acc + segment.duration, 0)
    )
  if (sortId === 'optimal')
    tickets.sort(
      (a, b) =>
        a.segments.reduce((acc, segment) => acc + segment.duration, 0) +
        a.price -
        (b.segments.reduce((acc, segment) => acc + segment.duration, 0) + b.price)
    )
  return tickets
}
