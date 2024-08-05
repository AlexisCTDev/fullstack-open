const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middelware')

commentsRouter.get('/comments', async (req, res) => {
  const comments = await Comment.find({}).populate(
    'blog',
    '-comments -createdAt -updatedAt'
  )

  if (comments.length === 0) {
    return res.status(404).end()
  }

  res.json(comments)
})

commentsRouter.get('/comments/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate(
    'blog',
    '-comments -createdAt -updatedAt'
  )

  if (comment) {
    res.json(comment)
  } else {
    res.status(404).end()
  }
})

commentsRouter.get('/:blogId/comments', async (req, res) => {
  const comments = await Comment.find({ blog: req.params.blogId })

  if (comments.length === 0) {
    return res.status(404).json({ error: 'No comments found' })
  }

  res.json(comments)
})

commentsRouter.post('/:blogId/comments', userExtractor, async (req, res) => {
  const { body, user } = req

  if (!body.comment) {
    return res.status(400).json({
      error: 'comment missing'
    })
  }

  const userToComment = await User.findById(user.id)
  const blogToComment = await Blog.findById(req.params.blogId)

  if (!userToComment || !blogToComment) {
    return res.status(404).end()
  }

  const newComment = new Comment({
    comment: body.comment,
    blog: blogToComment._id,
    user: userToComment._id
  })

  const savedComment = await newComment.save()

  blogToComment.comments.concat(savedComment._id)
  await blogToComment.save()

  userToComment.comments.concat(savedComment._id)
  await userToComment.save()

  res.status(201).json(savedComment)
})

commentsRouter.delete(
  '/comments/:commentId',
  userExtractor,
  async (req, res) => {
    const commentToDelete = await Comment.findById(req.params.commentId)

    if (!commentToDelete) {
      return res.status(404).send({
        error: 'comentario no econtrado'
      })
    }

    await Comment.findByIdAndDelete(req.params.commentId)
    res.status(204).end()
  }
)

module.exports = commentsRouter
