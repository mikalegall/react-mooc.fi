const Filter = (handleFilterChange, filter) => {
 
return (
 
    <div>
    filter shown with: <input value={filter}
    onChange={handleFilterChange}
    />
    </div>

)
}

export default Filter
