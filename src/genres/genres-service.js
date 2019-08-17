const authorsService = {
  getAllauthors(knex) {
    return knex.select('*').from('authors')
  },

  insertauthor(knex, newauthor) {
    return knex
      .insert(newauthor)
      .into('authors')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('authors')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteauthor(knex, id) {
    return knex('authors')
      .where({ id })
      .delete()
  },

  updateauthor(knex, id, newauthorFields) {
    return knex('authors')
      .where({ id })
      .update(newauthorFields)
  },
}

module.exports = authorsService