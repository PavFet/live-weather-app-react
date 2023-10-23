import React from 'react'
import {
  apiKey
} from '../config/apiKey'
import {
  useDispatch
} from 'react-redux'
import {
  setError,
  setDataCurrent,
  setCity,
  setDataForecast,
  setTime,
  setCoordination
} from '../features/states';



const useData = (city) => {
  const disp = useDispatch()


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey.forecast}&q=${city}&days=3`)
        const json = await res.json();
        console.log(json)
        disp(setDataCurrent({
          data: json
        }))
        disp(setCity({
          currentCity: json.location.name
        }))
        disp(setError({
          error: ''
        }))
        disp(setCoordination({
          lat: json.location.lat,
          lon: json.location.lon
        }))
        disp(setDataForecast({
          data: json.forecast
        }))



      } catch (error) {
        console.log(error)
        disp(setError({
          error: 'No matching location found.'
        }))
        disp(setDataForecast({
          data: ''
        }))
      }
    };



    fetchData();
  }, [city]);

  return;

}

const useTime = (lat, lon, dependencies) => {
  const disp = useDispatch()


  React.useEffect(() => {
    const fetchRealTime = async () => {
      try {
        const res = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey.realTime}&format=json&by=position&lat=${lat}&lng=${lon}`)
        const json = await res.json();
        disp(setTime({
          time: json.formatted.toString()
        }))
      } catch (error) {

      }
    };
    fetchRealTime()
  }, [dependencies])

}

const useFetch = {
  useData,
  useTime
}

export default useFetch