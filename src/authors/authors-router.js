const path = require('path')
const express = require('express')
const xss = require('xss')
const AauthorsService = require('./authors-service')

const authorsRouter = express.Router()
const jsonParser = express.json()

const serializeAuthor = author => ({
  id: author.id,
  author_titles: xss(author.author_titles),
})

authorsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    AuthorsService.getAllauthors(knexInstance)
      .then(authors => {
        res.json(authors.map(serializeAuthor))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { author_name } = req.body
    const newAuthor = { author_name }
    
    for (const [key, value] of Object.entries(newAuthor))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    authorsService.insertauthor(
      req.app.get('db'),
      newAuthor
    )
      .then(author => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${author.id}`))
          .json(serializeAuthor(author))
      })
      .catch(next)
  })

authorsRouter
  .route('/:authors')
  .all((req, res, next) => {
    authorsService.getById(
      req.app.get('db'),
      req.params.author_id
    )
      .then(author => {
        if (!author) {
          return res.status(404).json({
            error: { message: `author doesn't exist` }
          })
        }
        res.author = author
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeauthor(res.author))
  })

module.exports = authorsRouter
