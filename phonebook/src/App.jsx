const List = ({all, filter})=>{
  if (!filter) {
   return(
    all.map(person => <li key={person.id}><b>{person.name} {person.number}</b></li>)
   )
  }
  else{
   return(
    filter.map(person => <li key={person.id}><b>{person.name} {person.number}</b></li>)
   )
  }
}

import { useState } from 'react'

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

  const filter = ()=>{
    const tolowerSearch = newSearch.toLowerCase()
    const filtered =persons.filter(person => person.name.toLowerCase().includes(tolowerSearch))
    setPersonFilter(filtered)
    console.log(filtered);
  }
 
  return (
    <>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleSearch} />
      <form onSubmit={hanSubmit}>
      <h2>Add a new</h2>
        <div>
          name: <input onChange={handleName} value={newName} required/>
        </div>
        <div>
          Telefone: <input type="number" onChange={handleNumber} value={newNumber} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <List all={persons} filter={personFilter} />
      </ul>
    </>
  )
}

export default App