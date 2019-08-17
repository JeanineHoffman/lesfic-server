const AuthorsService = {
  getAllAuthors(knexInstance) {
      return knexInstance.select('*').from('Authors')
  },

  insertAuthor(knexInstance, newAuthor) {
      return knexInstance
          .insert(newAuthor)
          .into('Authors')
          .returning('*')
          .then(rows => {
              return rows[0]
          })
  },

  getById(knexInstance, AuthorsID) {
      return knexInstance
          .from('Authors')
          .select('*')
          .where('id', AuthorsID)
          .first()
  }
}

module.exports = AuthorsService
