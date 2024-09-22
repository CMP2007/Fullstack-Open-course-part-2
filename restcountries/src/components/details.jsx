const Details = ({countries})=>{
    
  const printLanguages = (languages)=>{
      const list = Object.values(languages);
      const li = list.map(language => <li key={language}>{language}</li>)
      return li
    }
    const imgClass = {
      width: 150,
    }
  return(
      <>
        {countries.map((country)=>
        <ul key={country.name.common}>
          <h2>{country.name.common}</h2>
          <li>
            <p>Capital: {country.capital}</p>
          </li>
          <li>
            <p>Area: {country.area}</p>
          </li>
          <li>
            <p>continents: {country.continents}</p>
          </li>
          <li>
            <p>Languages:</p>
            <ul>
              {printLanguages(country.languages)}
            </ul>
          </li>
          <li>
            <p>Flag: </p><img src={country.flags.svg} alt="country.flags.alt" style={imgClass}/>
          </li>
          <li>
            <p>coat of arms: </p><img src={country.coatOfArms.svg} alt=""style={imgClass} />
          </li>
        </ul>)}
    </>
    )
}

export default Details