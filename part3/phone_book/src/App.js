import { useEffect, useState } from 'react'
import AddNewPerson from './components/AddNewPerson'
import Filter from './components/Filter'
import Notification from './components/Notification/Notification'
import AllPersons from './components/AllPersons'
import servicesPerson from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})



  //useEffect( () => {...}, [])
  // useEffect takes 2 args (first is the actual code and second is for setup triggers)
  // When ever Component is rendered also Effect is executed but empty array [] means 'render only onces' 
  useEffect( () => {
  servicesPerson.getAll()
  .then(initialPersons => {
    setPersons(initialPersons)
  })
  },[])

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find( ( {name} ) => name === newName.trim())
    if(existingPerson !== undefined) {
      const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if(answer){

      const editedPerson = {
        name: newName.trim(),
        number: newNumber.trim(),
        id: existingPerson.id
      }

      servicesPerson.update(editedPerson)
      .then(returnEditedPerson => {
        //FIXME: UI does not update number-field from DB
        console.log('returnEditedPerson = ', returnEditedPerson)
       setPersons(persons.filter(person => person.id !== returnEditedPerson.id ? person : returnEditedPerson))
      }
      )
      .then(
        setMessage({error: false, content: `Updated ${editedPerson.name}´s number to ${editedPerson.number}`})
      )
      .catch(error => {
        console.log('Promise was rejected, error = ', error)
        setMessage({error: true, content: `Editing information of ${newName} did not went well on server side`})
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })

      setTimeout(() => {
        setMessage({})
      }, 3000)
    }
    
  } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      servicesPerson.create(newPerson)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
      })
      .then(
        setMessage({error: false, content: `Added ${newName}`})
      )
      .catch(error => {
        console.log('Promise was rejected, error = ', error)

        if(error.response.data.name === 'ValidationError'){
          setMessage({error: true, content: error.response.data.errormessage})
        } else {
        setMessage({error: true, content: `Note! Adding ${newName} did not went well on server side`})
        }
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })

      setTimeout(() => {
        setMessage({})
      }, 3000)

    }
  }

  const removePerson = (event) => {
    event.preventDefault();
    servicesPerson.remove(event.target.id)
    .then(
      // '!=' allows automatic type change
      // '!==' denies automatic attempt to change type, so need to parse manually
      setPersons(persons.filter(person => person.id !== parseInt(event.target.id) ? person : null))
    )
    .then(
      setMessage({error: false, content: `${event.target.name} removed`})
    )
    .catch(error => {
      console.log('Promise was rejected, error = ', error)
      setMessage({error: true, content: `Information of ${event.target.name} has already been removed from server`})
      setTimeout(() => {
        setMessage({})
      }, 5000)
    })

    setTimeout(() => {
      setMessage({})
    }, 3000)
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
      <Notification message={message} />
      <div>
        filter shown with: <input value={filter}
        onChange={handleFilterChange}
        />
      </div>

      <h2>Add a new</h2>
      <AddNewPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {
      filter
      ? <Filter persons={persons} filter={filter} removePerson={removePerson}/>
      : <AllPersons persons={persons} removePerson={removePerson}/>
      }
    </div>
  )

}

export default App