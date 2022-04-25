import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  //useEffect( () => {...}, [])
  // useEffect takes 2 args (first is the actual code and second is for setup triggers)
  // When ever Component is rendered also Effect is executed but empty array [] means 'render only onces' 
  useEffect( () => {
  axios.get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  },[])


  const addPerson = (event) => {
    event.preventDefault();

    if(persons.find( ( {name} ) => name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
    }
  }
  
  const handleNameChange = (event) => {
  event.preventDefault()
  setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
      event.preventDefault()
      setFilter(event.target.value)
      }
    return (
    <div>
      <h2>Phonebook</h2>
      {/* <Filter handleFilterChange={() => handleFilterChange} filter={filter}/> */}
      <div>
        filter shown with: <input value={filter}
        onChange={handleFilterChange}
        />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}
          />
          <br />
          number: <input value={newNumber}
          onChange={handleNumberChange}
          /> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
      persons.filter( ( {name} ) => name.toLowerCase().includes(filter.toLowerCase()))
      .map(person =>
      <div key={person.name}>{person.name} {person.number}</div>
      )
      }
    </div>
  )

}

export default App