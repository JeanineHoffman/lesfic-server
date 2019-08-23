const genreService = {
  getAllTitlesGenre(knex) {
    return knex.select('*').from('books')
  },

  
  getById(knex, id) {
    return knex
      .from('books')
      .select('*')
      .where('id', genre)
      .first()
  },
}

module.exports = genreService