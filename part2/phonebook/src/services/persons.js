import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (props) => {
  const {id, name, number} = props
  const updatePerson = {
    name: name,
    number: number
  }
  const request = axios.put(`${baseUrl}/${id}`, updatePerson)
  return request.then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { create, getAll, remove, update }