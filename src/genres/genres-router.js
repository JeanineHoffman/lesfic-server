const path = require('path')
const express = require('express')
const xss = require('xss')
const genresService = require('./genres-service')
const genresRouter = express.Router()
const jsonParser = express.json()

const serializegenre = books => ({
  id: books.id,
  genre: xss(books.genre),
  title: xss(books.title),
  author: books.author,
})

GenreRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    genreService.getByGenre(knexInstance)
      .then(authors => {
        // res.json(authors.map(author => serializeAuthor(author)))
        res.json(genre)
      })
      .catch(next)
  })
  
genresRouter
  .route('/:books')
  .all((req, res, next) => {
    genresService.getById(
      req.app.get('db'),
      req.params.genre
    )
      .then(genre => {
        if (!genre) {
          return res.status(404).json({
            error: { message: `genre doesn't exist` }
          })
        }
        res.genre = genre
        next()
      })
      .catch(next)
  })
  .

    genresService.updategenre(
      req.app.get('db'),
      req.params.genre_id,
      genreToUpdate
    )
      

module.exports = genresRouter