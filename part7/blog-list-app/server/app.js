require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('express-async-errors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middelware = require('./utils/middelware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB.')
  })
  .catch((error) => {
    logger.error('An error has ocurred', error.message)
  })

const app = express()

app.use(cors())
app.use(express.json())

app.use(middelware.tokenExtractor)
app.use('/api/blogs', commentsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middelware.unknownEndpoint)
app.use(middelware.errorHandler)

module.exports = app
