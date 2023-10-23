import React from 'react'
import './header.css'
import { useDispatch } from 'react-redux';
import { setCity } from '../features/states';
import { useSelector } from 'react-redux'
import fetch from '../hooks/useFetch';
import citiesDb from 'cities.json'






const Header = () => {
  const disp = useDispatch()

  
  


  const city = useSelector((state) => state.city.currentCity)
  const [inputValue, setInputValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  
  const arrayCities = citiesDb.map(x => {
    return x.name
  })

  const sortedArrayCities = arrayCities.sort()
  const uniqueCities = [ ...new Set(sortedArrayCities)]

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filteredSuggestions = uniqueCities.filter((suggestion, index) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    
  };
 

  fetch.useData(city)
  fetch.useData(city)


  const error = useSelector((state) => state.city.fetchError)

  const cityRef = React.useRef(null)
  const getCity = (e) => {
    disp(setCity({ currentCity: cityRef.current.value }))
    cityRef.current.value = ''
    setInputValue('')
    e.preventDefault()
  }

  return (
    <div className='container header'>
      <h2 className='title'>Real-time weather</h2>
      <div>
        <form className="input__block" action="">
          <input 
            ref={cityRef} 
            type="text" 
            placeholder='Search City'
            value={inputValue}
            onChange={handleInputChange}
          />
         {inputValue.length > 0 ? 
          <ul className='suggestion__list'>
           {  suggestions.slice(0,3).map((suggestion, index) => (
             <li onClick={getCity} key={index}>{suggestion}</li>
            ))
           }
          </ul> 
          :
          ''
        }
          
          <button onClick={getCity}>&#9740;</button>
        </form>
        {error.length > 0 ?
          <>
            <p>
              {error}
            </p>
          </>
          : <>
          </>}
      </div>
    </div>
  )
}

export default Header