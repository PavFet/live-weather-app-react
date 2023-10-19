import React from 'react'
import { useSelector } from 'react-redux'
import windDir from '../img/wind-dir.png'

const WindDirections = () => {
  const { current: { wind_dir: wind } } = useSelector((state) => state.city.fetchDataCurrent)


  return (
    <div className="wind__direction">
      <img className={wind} src={windDir} alt="wind direction" />
      <span>{wind}</span>
    </div>
  )
}

export default WindDirections