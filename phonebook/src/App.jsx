import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      telefone: "0401234567"
     },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

const hanSubmit = (e)=> {
  e.preventDefault();
  const checkName = persons.findIndex(person =>person.name === newName)
  console.log("name findIndex = ",checkName);

  const checkNumber = persons.findIndex(person =>person.telefone === newNumber)
  console.log("number findIndex = ",checkNumber);
  

  if (checkName === -1 && checkNumber === -1) {
    const objName = {name: newName, telefone: newNumber}
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

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={hanSubmit}>
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
        {persons.map(person => <li key={person.length}><b>{person.name} {person.telefone}</b></li>)}
      </ul>
    </>
  )
}

export default App