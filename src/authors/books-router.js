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
    // console.log("BooksRouter:get:knexInstance ", knexInstance);


    BooksService.getAllAuthors(knexInstance)
      .then(authors => {
        res.json(authors)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { author, title, genre } = req.body
    const newAuthor = { author, title, genre }

    for (const [key, value] of Object.entries(newAuthor))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request` }
        })
    BooksService.insertAuthor(
      req.app.get('db'),
      newAuthor
    )
      .then(author => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${author}`))
          .json(serializeAuthor(author))
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
