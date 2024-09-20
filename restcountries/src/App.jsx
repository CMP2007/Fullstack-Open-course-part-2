import { useState, useEffect } from 'react'
import Results from './components/results'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState([])

  const handleSearch = (e)=>{
    setSearch(e.target.value)
    filterData(e.target.value)
  }

  useEffect(()=>{
    console.log("promise start");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setData(response.data)
      })
  }, [])

  const filterData = (searching)=>{
      const toLowerData = searching.toLowerCase()
      const filtered = data.filter(country => country.name.common.toLowerCase().includes(toLowerData))
      setFilter(filtered)  
  }

  const load =()=>{
    if (search) {
      return <Results countries={filter} />
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
