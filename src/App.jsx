import React from 'react'
import logo from './logo.svg'
import FiltersList from './features/filters/FiltersList'
import SortsList from './features/sorts/SortsList'
import TicketsList from './features/tickets/TicketsList'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <img src={logo} className={styles.app__logo} alt="logo" />
      </header>
      <main className={styles.app__body}>
        <div className={styles['app__a-side']}>
          <FiltersList />
        </div>
        <div className={styles['app__b-side']}>
          <SortsList />
          <TicketsList />
        </div>
      </main>
    </div>
  )
}

export default App
