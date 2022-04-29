const CountryDetails = ({oneCountry, weather}) => {
    
    return (
        <>
        <div><h1>{oneCountry.name.common}</h1></div>
        <div>Capital: {oneCountry.capital}</div>
        <div>Area: {oneCountry.area}</div>
        <div><h3>Languages:</h3></div>
        {Object.values(oneCountry.languages).map(language => <li key={language}>{language}</li>)}
        <img src={oneCountry.flags.png} alt="Flag" />
        {weather.main !== undefined ? <div><h2>Weather in {oneCountry.capital}</h2></div> : null}      
        {weather.main !== undefined ? <div>Temperature {(weather.main.temp/32).toFixed(2)} Celsius</div> : null}
        {weather.weather ? <img src={weather.weather.map(o=> "https://openweathermap.org/img/wn/" + o.icon.toString() + "@2x.png")} alt="Weather icon" /> : null}
        {weather.wind !== undefined ? <div>Wind {(weather.wind.speed).toFixed(2)} m/s</div>: null}
        </>  
    )
}

export default CountryDetails