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

  const checkName = persons.findIndex(person =>person.name === newName)
  const checkNumber = persons.findIndex(person =>person.number === newNumber)
  const changeNumber = ()=>{
    if (window.confirm(`${newName} is already registered in the address book, do you want to change the registered number for a new one?`)) {
      const oldPerson = persons.find(person=>person.name === newName)
      const changePerson = {...oldPerson, number: newNumber}

      personsServises
        .change(changePerson, oldPerson.id)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response))              
        })
      setNewName("")  
      setNewNumber("")
    }         
    else{
      setNewName("")
    }
  }

  //This function uses findIndex to validate if the data already exists and based on that decide what to do
  const hanSubmit = (e)=> {
    e.preventDefault();
    if (checkName === -1 && checkNumber === -1) {
      const objName = {name: newName, number: newNumber}
      setNewName("")
      setNewNumber("")

      personsServises
        .create(objName)
        .then(response => setPersons(persons.concat(response)))
    }
    else{
      if (checkName !==-1) {
        changeNumber()
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
  }

  const deletedPerson = (id)=>{
    const person = persons.find(person => person.id === id)
    const name = person.name

    if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
      personsServises
      .deleted(id)
      .then(response=>{
        setPersons(persons.filter((person)=>person.id !== response.id))
        console.log("deleted: ", person);
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