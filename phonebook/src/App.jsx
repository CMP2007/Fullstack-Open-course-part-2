import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]) 
  const [newName, setNewName] = useState('')

const hanSubmit = (e)=> {
  e.preventDefault();
  const checkName = persons.findIndex(person =>person.name === newName)
  console.log(checkName);

  if (checkName === -1) {
    const objName = {name: newName}
    setPersons(persons.concat(objName))
    setNewName("")
  }
  else{
    alert(`${newName} is already added to phonebook`)
    setNewName("")
  }
}

const handleName = (e)=>{
  console.log(e.target.value);
  setNewName(e.target.value)
}

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={hanSubmit}>
        <div>
          name: <input onChange={handleName} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.length}>{person.name}</li>)}
      </ul>
    </>
  )
}

export default App