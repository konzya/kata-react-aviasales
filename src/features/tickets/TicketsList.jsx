import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { fetchTickets, selectFilteredSortedTickets, selectTicketsStatus, TicketsStatusEnum } from './ticketsSlice'

import Ticket from './Ticket'
import styles from './TicketsList.module.scss'

export default function TicketsList() {
  const dispatch = useDispatch()
  const tickets = useSelector(selectFilteredSortedTickets)
  const ticketsStatus = useSelector(selectTicketsStatus)

  const [ticketsCounter, setTicketsCounter] = useState(5)

  useEffect(() => {
    if (ticketsStatus === TicketsStatusEnum.idle) {
      dispatch(fetchTickets)
    }
  }, [dispatch, ticketsStatus])

  const items = []
  let needButton = true
  for (let i = 0; i < ticketsCounter; i += 1) {
    if (tickets.length === i) {
      needButton = false
      break
    }
    items.push(
      <li key={nanoid()}>
        <Ticket ticket={tickets[i]} />
      </li>
    )
  }

  const clickHandler = (e) => {
    setTicketsCounter((prev) => prev + 5)
    e.target.blur()
  }

  const button = (
    <button className={styles.tickets__button} type="button" onClick={clickHandler}>
      Показать еще 5 билетов!
    </button>
  )

  const spinner = <div className={styles.tickets__spinner} />

  return (
    <section className={styles.tickets}>
      {ticketsStatus === TicketsStatusEnum.fetching ? spinner : null}
      <ul className={styles.tickets__list}>{items}</ul>
      {needButton ? button : null}
    </section>
  )
}
