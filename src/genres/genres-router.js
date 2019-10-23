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
  author: xss(books.author),
})

GenreRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    // console.log("BooksRouter:get:knexInstance ", knexInstance);

    BooksService.getAllGenres(knexInstance)
    .then(genres => {
      res.json(authors)
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
  const { author, title, genre } = req.body
  const newGenre = { author, title, genre }
  for (const [key, value] of Object.entries(newGenre))
  if (value == null)
    return res.status(400).json({
      error: { message: `Missing '${key}' in request` }
    })
    GenresService.insertGenre(
      req.app.get('db'),
      newGenre
    )  
    .then(genre => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${genre}`))
        .json(serializeGenre(genre))
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

    genresService.updategenre(
      req.app.get('db'),
      req.params.genre_id,
      genreToUpdate
    )
      

module.exports = genresRouter