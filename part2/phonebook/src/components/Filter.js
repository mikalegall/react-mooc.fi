const Filter = (props) => {
const {filter, persons, removePerson} = props
    return (
        persons.filter( ( {name} ) => name.toLowerCase().includes(filter.toLowerCase()))
        .map(person =>
        <div key={person.id}>{person.name} {person.number}
        <button onClick={removePerson} id={person.id}>Delete</button>
        </div>
        )
    )
}

export default Filter