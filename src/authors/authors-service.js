const AuthorsService = {
  getAllAuthors(knexInstance) {
      return knexInstance.select('*').from('Books')
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
          .from('Books')
          .select('*')
          .where('id', AuthorsID)
          .first()
  }
}

module.exports = AuthorsService
