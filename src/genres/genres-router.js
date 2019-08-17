const path = require('path')
const express = require('express')
const xss = require('xss')
const genresService = require('./genres-service')

const genresRouter = express.Router()
const jsonParser = express.json()

const serializegenre = genre => ({
  id: genre.id,
  genre_title: xss(genre.genre_title),
  
  author_name: genre.author_name
})

genresRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    genresService.getAllgenres(knexInstance)
      .then(genres => {
        res.json(genres.map(serializegenre))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { genre_title, content, date_modified, author_name } = req.body
    const newgenre = { genre_title, content, author_name }

    for (const [key, value] of Object.entries(newgenre))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    genresService.insertgenre(
      req.app.get('db'),
      newgenre
    )
      .then(genre => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${genre.id}`))
          .json(serializegenre(genre))
      })
      .catch(next)
  })

genresRouter
  .route('/:genres')
  .all((req, res, next) => {
    genresService.getById(
      req.app.get('db'),
      req.params.genre_id
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
  .get((req, res, next) => {
    res.json(serializegenre(res.genre))
  })
  .delete((req, res, next) => {
    genresService.deletegenre(
      req.app.get('db'),
      req.params.genre_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { content } = req.body
    const genreToUpdate = { content }

    const numberOfValues = Object.values(genreToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain 'content'`
        }
      })

    genresService.updategenre(
      req.app.get('db'),
      req.params.genre_id,
      genreToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = genresRouter