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
  insertGenre(knex, newGenre) {
    return knex
      .insert(newGenre)
      .into('books')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
}

module.exports = genreService