import React from 'react'
import { useSelector } from 'react-redux'
import { selectSortsIds } from './sortsSlice'
import Sort from './Sort'
import styles from './SortsList.module.scss'

export default function FiltersList() {
  const sorts = useSelector(selectSortsIds)

  const items = sorts.map((sortId) => (
    <li key={sortId}>
      <Sort id={sortId} />
    </li>
  ))

  return <ul className={styles['sorts-list']}>{items}</ul>
}
