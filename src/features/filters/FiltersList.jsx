import React from 'react'
import { useSelector } from 'react-redux'
import { selectFiltersIds } from './filtersSlice'
import Filter from './Filter'
import styles from './FilterList.module.scss'

export default function FiltersList() {
  const filters = useSelector(selectFiltersIds)

  const items = filters.map((filterId) => (
    <li key={filterId}>
      <Filter id={filterId} />
    </li>
  ))

  return (
    <section className={styles.filters}>
      <h2 className={styles.filters__header}>Количество пересадок</h2>
      <ul className={styles.filters__list}>{items}</ul>
    </section>
  )
}
