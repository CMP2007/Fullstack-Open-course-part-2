import promises from "../services/promises"
import {useEffect} from 'react'
const Weather = ({countries, weather, setWeather})=>{

  const imgClass = {
    width: 100,
  }

  const iconBox = {
    display: "flex",
    flexDirection: "column"
  }

  if (countries[0]) {
    const country = countries[0]
    
    const city = country.capital[0]
    console.log(city);
    
    useEffect(()=>{
    promises
      .weatherGet(city)
      .then(response=> {
        console.log(response.data);
        const temp = response.data.main.temp -273.15
        const tempFinal = temp.toFixed(2)
        const weatherObject = {
          temp: tempFinal, 
          wind: response.data.wind.speed, 
          icon: response.data.weather[0]
        }
        setWeather(weatherObject)
      })
    },[])

    const insertIcon= (weather)=>{    
      console.log(weather);
      
      if (Object.keys(weather).length === 0) {
        return null      
      }
      else{
        return(
          <div style={iconBox}>
            <img src={`https://openweathermap.org/img/wn/${weather.icon.icon}@2x.png`} alt={weather.icon.description} style={imgClass}/>
            <span>{weather.icon.description}</span>
          </div>
        )
      }
    }

    return(
      <>
        <h2>Weather in {city}</h2>
        <p><b>Temperature {weather.temp } Celcius</b></p>
        {insertIcon(weather)}
        <p><b>Wind {weather.wind} m/s</b></p>
      </>
    )

  }
  else{
    return null
  }
}

export default Weather