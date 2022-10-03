import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFilter, selectFilterById } from './filtersSlice'
import styles from './Filter.module.scss'

export default function Filter({ id }) {
  const dispatch = useDispatch()
  const filter = useSelector((state) => selectFilterById(state, id))

  const onCheckboxChange = (e) => {
    dispatch(toggleFilter(id))
    e.target.blur()
  }

  return (
    <label className={styles.filter} htmlFor={id}>
      <input
        className={styles.filter__checkbox}
        type="checkbox"
        checked={filter.checked}
        id={id}
        onChange={onCheckboxChange}
      />
      {filter.name}
    </label>
  )
}
Filter.propTypes = {
  id: PropTypes.string.isRequired,
}
