import { createSlice } from "@reduxjs/toolkit";


export const statesSlice  = createSlice({
  name: "city",
  initialState: {
    currentCity: 'Vilnius',

    fetchError: '',

    fetchDataCurrent: {

    },

    fetchDataForecast: {

    },

    realTime: '',

    coordination: {
      lat: '54.68',
      lon: '25,32'
    }

  },
  reducers: {
   setCity: (state, action) => {
      const {currentCity } = action.payload
      state.currentCity = currentCity
   },
   setError: (state, action) => {
    const { error } = action.payload
    state.fetchError = error
 },
   setDataCurrent: (state, action) => {
    const { data } = action.payload
    state.fetchDataCurrent = data
},
  setDataForecast: (state, action) => {
    const { data } = action.payload
    state.fetchDataForecast = data
},
  setTime: (state, action) => {
    const { time } = action.payload
    state.realTime = time
},
setCoordination: (state, action) => {
  const { lat, lon } = action.payload
  state.coordination.lat = lat
  state.coordination.lon = lon
},
  },
})

export const { setCoordination, setTime, setCity, setError, setDataCurrent, setDataForecast } = statesSlice.actions
export default statesSlice.reducer