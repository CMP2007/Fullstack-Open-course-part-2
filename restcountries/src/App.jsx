import { useState, useEffect } from 'react'
import Results from './components/results'
import promises from './services/promises'

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState([])
  const [show, setShow] = useState("")
  const [weather, setWeather] = useState({})

  const handleSearch = (e)=>{//
    setSearch(e.target.value)
    filterData(e.target.value)
  }

  useEffect(()=>{
    console.log("promise start");
    promises
      .countryGet()
      .then(response => {
        setData(response.data)
      })
      .catch(()=>console.log("Failed to connect to server"))
  }, [])

  const filterData = (searching)=>{
      const toLowerData = searching.toLowerCase()
      const filtered = data.filter(country => country.name.common.toLowerCase().includes(toLowerData))
      setFilter(filtered)  
  }

  const activateShow =(country)=>()=>{    
    const newShow = country.name.common 
    setShow(newShow)
  }

  const load =()=>{
    if (search) {
      return (
        <Results 
          countries={filter} 
          activateShow={activateShow} 
          show={show}
          weather={weather}
          setWeather={setWeather}
        />
      )
    }
    else {
      return <Results countries={data} />
    }
  }
  
  return (
  <>
    <div>
      <label htmlFor='search'>find countrys </label>
      <input type="text" id='search' onChange={handleSearch} value={search} />
    </div>
    <div>
      {load()}
    </div>
  </>
  )
}

export default App