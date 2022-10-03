import React from 'react'
import PropTypes from 'prop-types'
import styles from './Ticket.module.scss'
import { getFlyingTime } from '../../helpers'

function Row({ segment }) {
  const { origin, destination, date, stops, duration } = segment
  let stopsText
  if (stops.length !== 0) {
    stopsText = `${stops.length} ${stops.length > 1 ? 'пересадки' : 'пересадка'}`
  } else {
    stopsText = 'Без пересадок'
  }
  const { timePeriod, inAir } = getFlyingTime(date, duration)

  return (
    <div className={styles.ticket__row}>
      <div className={styles.ticket__column}>
        <span
          className={`${styles.ticket__text} ${styles['ticket__text--light']}`}
        >{`${origin} - ${destination}`}</span>
        <span className={styles.ticket__text}>{timePeriod}</span>
      </div>
      <div className={`${styles.ticket__column} ${styles['ticket__column--middle']}`}>
        <span className={`${styles.ticket__text} ${styles['ticket__text--light']}`}>В пути</span>
        <span className={styles.ticket__text}>{inAir}</span>
      </div>
      <div className={styles.ticket__column}>
        <span className={`${styles.ticket__text} ${styles['ticket__text--light']}`}>{stopsText}</span>
        <span className={styles.ticket__text}>{stops.join(', ')}</span>
      </div>
    </div>
  )
}

export default function Ticket({ ticket }) {
  const { price, carrier, segments } = ticket

  return (
    <article className={styles.ticket}>
      <header className={styles.ticket__header}>
        <span className={styles.ticket__price}>{`${price.toLocaleString('ru')} Р`}</span>
        <img className={styles.ticket__logo} src={`https://pics.avs.io/99/36/${carrier}.png`} alt={`${carrier} logo`} />
      </header>
      {segments.map((segment) => (
        <Row segment={segment} key={segment.date} />
      ))}
    </article>
  )
}

Row.propTypes = {
  segment: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    stops: PropTypes.arrayOf(PropTypes.string).isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
}

Ticket.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number.isRequired,
    carrier: PropTypes.string.isRequired,
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        origin: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        stops: PropTypes.arrayOf(PropTypes.string).isRequired,
        duration: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
}
