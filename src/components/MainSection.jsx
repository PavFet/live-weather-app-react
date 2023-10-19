import React from 'react'
import './mainSection.css'
import { useSelector } from 'react-redux'
import drop from '../img/drop.png'
import cloud from '../img/cloud.png'
import thermometer from '../img/thermometer.png'
import wind from '../img/wind.gif'
import WindDirections from './WindDirections';
import pressure from '../img/pressure.png'
import SingleForecast from './SingleForecast'
import fetch from '../hooks/useFetch';



const MainSection = () => {
  const [isOpen, setIsOpen] = React.useState(true)


  const forecast = useSelector((state) => state.city.fetchDataForecast)
  const { current, location } = useSelector((state) => state.city.fetchDataCurrent)
  const { lat, lon } = useSelector((state) => state.city.coordination)
  
  const toggleList = () => setIsOpen(!isOpen)
  const time = useSelector((state) => state.city.realTime)

  fetch.useTime(lat, lon, location)

  const hours = time.slice(-8, -3)

  const meterToSecond = (val) => {
    const res = val * 1000 / 3600
    return res.toFixed(1)
  }

  return (
    <>
      {location === undefined ? '' :
        <>
          <div className="container main_section">
            <h6 className='location_name'>
              <i className='icon'><i className='icon__location'></i></i>
              {location.name}
            </h6>

            <div className="current_conditions">
              <p className='temperature'>
                {current.temp_c}
              </p>
              <img src={`http:${current.condition.icon}`} alt={current.condition.text} />
            </div>

          </div>

          {forecast.forecastday !== undefined && forecast !== undefined ?
            <p className='last_updated'>
              Current time in {location.name}:  {time.slice(0, -3)}
              <br></br>
              <br></br>
              Sunrise: {forecast.forecastday[0].astro.sunrise}
              <br></br>
              Sunset: {forecast.forecastday[0].astro.sunset}
              <br></br>
              Updated: {current.last_updated}

            </p>
            :
            ''
          }

          <div className="indicators_section">
            <div className="indicators_section_top">
              <div className="humidity">
                <div className="humidity__img">
                  <img src={drop} alt="drop" />
                </div>
                <div className="humidity__indicator">
                  <p className='indicator_value'>Humidity </p>
                  <span>{current.humidity} %</span>
                </div>

              </div>
              <div className="separator"></div>
              <div className="clouds">
                <div className="clouds__img">
                  <img src={cloud} alt="cloud" />
                </div>
                <div className="clouds__indicator">
                  <p className='indicator_value'>Clouds </p>
                  <span>{current.cloud} %</span>
                </div>
              </div>
              <div className="separator"></div>
              <div className="feels_like">
                <div className="feels_like__img">
                  <img src={thermometer} alt="thermometer" />
                </div>
                <div className="feels_like__indicator">
                  <p className='indicator_value'>Feels like </p>
                  <span> {current.feelslike_c} &#8451;</span>
                </div>
              </div>
            </div>
            <div className="indicators_section_bottom">
              <div className="wind__section">
                <div className="wind__img">
                  <img src={wind} alt="wind" />
                </div>
                <div className="wind__data">
                  <p className='indicator_value'>Wind </p>
                  <span>{meterToSecond(current.wind_kph)} m/s</span>
                </div>

                <WindDirections>
                </WindDirections>
              </div>
              <div className="separator"></div>
              <div className="pressure__section">
                <div className="pressure__img">
                  <img src={pressure} alt="pressure" />
                </div>
                <div className="pressure__data">
                  <p className='indicator_value'>Pressure </p>
                  <span>{current.pressure_mb} mb</span>
                </div>
              </div>
            </div>
          </div>
          <div className="forecast__btn">

            <button onClick={toggleList}>{isOpen ? 'LESS' : 'MORE'}</button>
          </div>
        </>


      }


      {forecast.forecastday !== undefined && forecast !== undefined ? <div className={isOpen ? 'forecast__list' : 'display__none'}>
        {forecast.forecastday[0].hour
          .filter((item) => {
            const time = item.time.slice(-5, -3);
            return time > hours;
          })
          .map(x => <SingleForecast
            key={x.time_epoch}
            time={x.time.slice(-5)}
            condition={x.condition}
            temperature={x.temp_c}
            wind={meterToSecond(x.wind_kph)}
            humidity={x.humidity}
          />)}
      </div> :
        ''
      }

    </>
  )
}

export default MainSection