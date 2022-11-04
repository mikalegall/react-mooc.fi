const testingRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
          return authorization.substring(7)
        }
      return null
    }

testingRouter.post('/reset', async (request, response) => {
  //   const token = getTokenFrom(request)
  //   const decodedToken = jwt.verify(token, process.env.SECRET)
  //     if (!token || !decodedToken.id) {
  //       return response.status(401).json({
  //         error: 'token missing or invalid'
  //         })
  //     }

  // const user = await User.findById(decodedToken.id)
  // if (!user.username) {
  //   return response.status(401).json({
  //     error: 'Not allowed for anonymos users'
  //     })
  // }
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter