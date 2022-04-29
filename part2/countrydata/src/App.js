import axios from 'axios';
import { useEffect, useState} from 'react'
import CountryList from './components/ContryList';
import CountryDetails from './components/CountryDetails';

function App() {

  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY //set REACT_APP_WEATHER_API_KEY=foo && npm start

  const[countries, setCountries] = useState([])
  const[text, setText] = useState("")
  const[results, setResults] = useState([])
  const[weather, setWeather] = useState({})
  const[showCountry, setShowCountry] = useState("")

  useEffect( () => {
    axios.get("https://restcountries.com/v3.1/all").then(
      (response) => {
        setCountries(response.data)
      }
    )
  }, [])


  // Find countries
  const handleChange = (event) => {
    event.preventDefault()
    setText(event.target.value)
    setShowCountry("")

    let searchResults = []
    countries.map((country) => country.name)
    .filter(( {common} ) => common.toLowerCase().includes(event.target.value.toLowerCase()))
    .map((name) => searchResults = searchResults.concat(name.common))
    setResults(searchResults)
    }

    
    //From CountryList show one country
    const handleClick = (event) => {
      event.preventDefault()
      let searchResults = []
      countries.map((country) => country.name)
      .filter(( {common} ) => common.toLowerCase().includes(event.target.name.toLowerCase()))
      .map((name) => searchResults = searchResults.concat(name.common))
      setText(event.target.name)
      setResults(searchResults)
    }


    let oneCountry = {}
    if(results.length === 1) {

      oneCountry = countries.find((country) => {
      if(country.name.common === results[0]) {
        return country
      }})

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${oneCountry.capital}&appid=${weather_api_key}`
      axios.get(url).then(
        (response) => {
          console.log('response.data = ', response.data)
          //FIXME: Too much re-rendering
          //setWeather(response.data)
        }
      )

    }

    return (
    <>
     <div>Find countries <input value={text} onChange={handleChange} /></div>
    {
      results.length > 10 ? <div>Too many matches, specify another filter</div>
      : results.length !== 1 ? <CountryList results={results} handleClick={handleClick}/>
      : <CountryDetails oneCountry={oneCountry} weather={weather} />
    }
    </>
  );
}

export default App;
