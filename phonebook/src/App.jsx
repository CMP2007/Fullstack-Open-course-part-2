import { useState } from 'react'

import Filter from './components/filter'
import PersonForm from './components/personForm'
import List from './components/list'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personFilter, setPersonFilter] = useState('')

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