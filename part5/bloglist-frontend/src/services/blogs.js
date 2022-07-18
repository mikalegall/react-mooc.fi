import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

// REST Crud: CREATE
const create = async newObject => {
  // const request = axios.post(baseUrl, newObject)
  // return request.then(response => response.data)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}


// REST cRud: READ
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}


// REST crUd: UPDATE
const update = (id, newObject) => {

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}


// REST cruD: DELETE
const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  return axios.delete(`${baseUrl}/${id}`, config)
    .then(response =>
      response
    )

}

export default {
  getAll,
  create,
  update,
  remove,
  setToken
}