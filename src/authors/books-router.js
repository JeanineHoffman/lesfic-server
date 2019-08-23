const path = require('path')
const express = require('express')
const xss = require('xss')
const booksService = require('./books-service')
const booksRouter = express.Router()
const jsonParser = express.json()

const serializeAuthor = book => ({
  id: book.id,
  titles: xss(book.title),
})

booksRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    booksService.getAllAuthors(knexInstance)
      .then(authors => {
        res.json(authors)
      })
      .catch(next)
  })
//where clauses querie parameters

booksRouter
  .route('/:search')
  .all((req, res, next) => {
    booksService.getByAuthor(
      req.app.get('db'),
      req.params.author_name
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
    res.json(author)
  })

module.exports = booksRouter
