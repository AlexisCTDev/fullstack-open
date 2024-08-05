const blogsRouter = require('express').Router()

const User = require('../models/user')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middelware')

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { body, user } = request

  if (!user || !user._id) {
    return response.status(401).json({ error: 'missing or invalid jwt' })
  }

  const userOfDb = await User.findById(user._id)

  const blog = new Blog({
    ...body,
    user: userOfDb._id
  })

  const savedBlog = await blog.save()

  userOfDb.blogs = userOfDb.blogs.concat(savedBlog)
  await userOfDb.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blogToReturn = await Blog.findById(id).populate('user', 'username')

  if (blogToReturn) {
    response.json(blogToReturn)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const updateFields = request.body

  const options = {
    new: true,
    runValidators: true,
    context: 'query'
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateFields, options)

  if (!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request

  if (!(user || user._id)) {
    return response.status(401).end()
  }

  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    return response.status(404).end()
  }

  if (user._id.toString() !== blogToDelete.user.toString()) {
    return response.status(401).end()
  }

  await Blog.findByIdAndDelete(request.params.id)

  user.blogs = user.blogs.filter(
    (blogId) => blogId.toString() !== request.params.id
  )

  await user.save()

  response.status(204).end()
})

module.exports = blogsRouter
