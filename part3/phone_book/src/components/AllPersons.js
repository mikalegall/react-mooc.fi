import Person from './Person'

const AllPersons = ( {persons, removePerson} ) => {
    return <Person persons={persons} removePerson={removePerson}/>
}

export default AllPersons