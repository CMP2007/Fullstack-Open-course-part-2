import { useState, useEffect } from 'react'
import personsServises from './services/persons'

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
    personsServises
      .getAll()
      .then(response =>{
        setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const checkName = persons.findIndex(person =>person.name === newName)
  const checkNumber = persons.findIndex(person =>person.number === newNumber)

  //This function uses findIndex to validate if the data already exists and save it or raise the alert
  const hanSubmit = (e)=> {
    e.preventDefault();
    if (checkName === -1 && checkNumber === -1) {
      console.log("name checked");
      console.log("number checked");
      const objName = {name: newName, number: newNumber}
      setNewName("")
      setNewNumber("")

      personsServises
        .create(objName)
        .then(response => setPersons(persons.concat(response)))
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
    setNewName(e.target.value)
  }

  const handleNumber = (e)=>{
    setNewNumber(e.target.value)
  }

  const handleSearch = (e)=>{
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
    console.log("filtering based on: ",filtered);
  }

  const deletedPerson = (id)=>{
    const person = persons.find(person => person.id === id)
    const name = person.name
    console.log(person);
    if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
      personsServises
      .deleted(id)
      .then(response=>{
        setPersons(persons.filter((person)=>person.id !== response.id))
      })
    }
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
        <List all={persons} filter={personFilter} action={deletedPerson} />
      </ul>
    </>
  )
}

export default App