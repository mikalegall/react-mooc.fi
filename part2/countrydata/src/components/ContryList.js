const CountryList = ({results, handleClick}) => {
    return(
        results.map(result => <div key={result}>{result}<button onClick={handleClick}  name={result}>show</button></div>)
        )
    }

export default CountryList