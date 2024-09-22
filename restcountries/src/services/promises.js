import axios from "axios"

const countryGet= ()=>{
    return axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
}



const weatherGet = (city)=>{
    const addcity = city.toLowerCase()    
    const apiKey = import.meta.env.VITE_API_KEY 
    
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${addcity}&appid=${apiKey}`)
    .catch(()=>console.log("Error Icon")
    )
}

export default{
    countryGet,
    weatherGet
}