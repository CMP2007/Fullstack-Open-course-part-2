import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/filter'
import PersonForm from './components/personForm'
import List from './components/list'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    console.log('promise start')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response);
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  //This function uses findIndex to validate if the data already exists and save it or raise the alert
  const hanSubmit = (e)=> {
    e.preventDefault();
    const checkName = persons.findIndex(person =>person.name === newName)
    console.log("name findIndex = ",checkName);

    const checkNumber = persons.findIndex(person =>person.number === newNumber)
    console.log("number findIndex = ",checkNumber);

    if (checkName === -1 && checkNumber === -1) {
      const objName = {name: newName, number: newNumber, id: persons.length +1}
      setPersons(persons.concat(objName))
      setNewName("")
      setNewNumber("")
    }
    else{
      if (checkName !==-1) {
        alert(`${newName} is already added to phonebook`)
        setNewName("")  
      }
      else if (checkNumber !== -1) {
        alert(`the phone number ${newNumber} is already registered for another contact in the phone book`)
        setNewNumber("") 
      }
    }
  }

  //These three handle functions are the event handlers of the inputs
  const handleName = (e)=>{
    console.log(e.target.value);
    setNewName(e.target.value)
  }

  const handleNumber = (e)=>{
    console.log(e.target.value);
    setNewNumber(e.target.value)
  }

  const handleSearch = (e)=>{
    console.log(e.target.value)
    setNewSearch(e.target.value)
    if (e.target.value) {
      filter()
    } 
    else{
      setPersonFilter(null)
    }
  }
  //This function generates and saves a new array with the filtered data
  const filter = ()=>{
    const tolowerSearch = newSearch.toLowerCase()
    const filtered =persons.filter(person => person.name.toLowerCase().includes(tolowerSearch))
    setPersonFilter(filtered)
    console.log(filtered);
  }
  
  //These constants group the data and event handlers to be passed through the props
  const handleEvents = [hanSubmit, handleName, handleNumber]
  const newData= [newName, newNumber]

  return (
    <>
      <h1>Phonebook</h1>
      <Filter handleSearch={handleSearch}/>
      
      <h2>Add a new</h2>
      <PersonForm handleEvents={handleEvents} newData={newData}  />

      <h2>Numbers</h2>
      <ul>
        <List all={persons} filter={personFilter} />
      </ul>
    </>
  )
}

export default App