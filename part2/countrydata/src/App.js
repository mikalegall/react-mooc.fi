import axios from 'axios';
import {Children, useEffect, useState} from 'react'

function App() {

  const[countries, setCountries] = useState([])
  const[text, setText] = useState("")
  const[results, setResults] = useState([])
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY //set REACT_APP_WEATHER_API_KEY=foo && npm start

  useEffect( () => {
    axios.get("https://restcountries.com/v3.1/all").then(
      (response) => {
        setCountries(response.data)
      }
    )
  }, [])


  const handleChange = (event) => {
    event.preventDefault()
    setText(event.target.value)  

    let searchResults = []
    countries.map((country) => country.name)
    .filter(( {common} ) => common.toLowerCase().includes(event.target.value.toLowerCase()))
    .map((name) => searchResults = searchResults.concat(name.common))
    setResults(searchResults)
    }



    let oneCountry = {}
    let weather = {};
    if(results.length === 1) {

      oneCountry = countries.find((country) => {
      if(country.name.common === results[0]) {
        return country
      }})


      let url = `https://api.openweathermap.org/data/2.5/weather?q=${oneCountry.capital}&appid=${weather_api_key}`
      axios.get(url).then(
        (response) => {
          weather = response.data
        }
      )

    }

    return (
    <>
     <div>Find countries <input value={text} onChange={handleChange} /></div>
    {
      results.length > 10 ? <div>Too many matches, specify another filter</div>
      : results.length !== 1 ? results.map(result => <div key={result}>{result}</div>)
      :
      <>
      <div><h1>{oneCountry.name.common}</h1></div>
      <div>Capital: {oneCountry.capital}</div>
      <div>Area: {oneCountry.area}</div>
      <div><h3>Languages:</h3></div>
      {Object.values(oneCountry.languages).map(language => <li key={language}>{language}</li>)}
      <img src={oneCountry.flags.png} alt="Flag" />
      {console.log('weather: ', weather)}
      {weather.main !== undefined ? <div><h2>Weather in {oneCountry.capital}</h2></div> : null}      
      {weather.main !== undefined ? <div>Temperature {(weather.main.temp/32).toFixed(2)} Celsius</div> : null}
      {weather.weather ? <img src={weather.weather.map(o=> "https://openweathermap.org/img/wn/" + o.icon.toString() + "@2x.png")} alt="Weather icon" /> : null}
       {/* <img src={weather.weather !== undefined ? weather.weather.map(o=> "https://openweathermap.org/img/wn/" + o.icon.toString() + "@2x.png") : null} alt="Weather icon" /> */}
      {weather.wind !== undefined ? <div>Wind {(weather.wind.speed).toFixed(2)} m/s</div>: null}
      </>
    }
  </>
  );
}

export default App;
