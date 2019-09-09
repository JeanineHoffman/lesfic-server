const path = require('path')
const express = require('express')
const xss = require('xss')
const BooksService = require('./books-service')
const BooksRouter = express.Router()
const jsonParser = express.json()

const serializeAuthor = book => ({
  id: book.id,
  titles: xss(book.title),
})

BooksRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    console.log("BooksRouter:get:knexInstance ", knexInstance);
    

    BooksService.getAllAuthors(knexInstance)
      .then(authors => {
        res.json(authors)
      })
      .catch(next)
  })

BooksRouter
  .route('/:author')
  .get((req, res, next) => {
    BooksService.getByAuthor(
      req.app.get('db'),
      req.params.author
    )
      .then(books => {
        if (!books) {
          return res.status(404).json({
            error: { message: `author doesn't have books in our system` }
          })
        }
        return res.status(200).json(books)
        next()
      })
      .catch(next)
  })
  

module.exports = BooksRouter
