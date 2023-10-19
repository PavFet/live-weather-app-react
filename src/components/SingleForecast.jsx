import React from 'react'
import windImg from '../img/forecast-wind.png'
import humidityImg from '../img/drop.png'

const SingleForecast = ({ time, condition, temperature, wind, humidity }) => {

  return (
    <div className='forecast__section'>
      <div className="forecast__hour">
        <span>{time}</span>
      </div>
      <div className="forecast__temperature">
        <span>{temperature} &#8451;</span>
      </div>
      <div className="forecast__condition">
        <img src={`http:${condition.icon}`} alt={condition.text} />
      </div>
      <div className="forecast__wind__humidity">
        <div className="forecast__wind">
          <img src={windImg} alt="wind" />
          <span>{wind} m/s</span>
        </div>
        <div className="forecast__humidity">
          <img src={humidityImg} alt="wind" />
          <span>{humidity} %</span>
        </div>
      </div>
    </div>
  )
}

export default SingleForecast