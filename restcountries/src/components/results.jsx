import Details from "./details"
import Weather from "./weather"
const Results =({countries, activateShow, show,weather,setWeather})=>{
  
  const selectedCountry = countries.find(c => c.name.common === show);
  const arrayCountry = [selectedCountry]
  
  const openShow = (country)=>{
    if (country.name.common == show) {
      console.log(country.name.common);
      return <Details countries={arrayCountry} />;
    }
    return null;
  }
  
  if (countries.length > 10) {
    return(
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }
  else if(countries.length >= 2){
    return(
      <ul>
        {countries.map((country)=>
        <li key={country.name.common}>
          {country.name.common} 
          <button onClick={activateShow(country)}>show</button>
          {openShow(country)}
        </li>)}
    </ul>
    )
  }
  else{
    return (
    <>
      <Details countries={countries} />
      <Weather  countries={countries} weather={weather} setWeather={setWeather}/>
    </>
  )
  }
}

export default Results