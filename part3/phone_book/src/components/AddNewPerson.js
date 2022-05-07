const AddNewPerson = (props) => {
 const {addPerson, newName, handleNameChange, newNumber, handleNumberChange} = props
return (
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
)
}

export default AddNewPerson