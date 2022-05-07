const Person = ( {persons, removePerson} ) => {
    return (
        persons
        .map(person =>
        <div key={person.id}>{person.name} {person.number}
        <button onClick={removePerson} id={person.id} name={person.name}>Delete</button>
        </div>
        )
    )
}

export default Person