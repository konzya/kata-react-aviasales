import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { selectSortById, chooseSort } from './sortsSlice'
import styles from './Sort.module.scss'

export default function Sort({ id }) {
  const { name, active } = useSelector((state) => selectSortById(state, id))
  const dispatch = useDispatch()
  const clickHandler = (e) => {
    if (active) return
    dispatch(chooseSort(id))
    e.target.blur()
  }
  const className = `${styles.sort} ${active ? styles['sort--active'] : ''}`
  const tabIndex = active ? -1 : 0
  return (
    <button className={className} type="button" onClick={clickHandler} tabIndex={tabIndex}>
      {name}
    </button>
  )
}

Sort.propTypes = {
  id: PropTypes.string.isRequired,
}
