const BooksService = {
  getAllAuthors(knexInstance) {
      return knexInstance.select('*').from('books')
  },

  getById(knexInstance, AuthorsID) {
      return knexInstance
          .from('books')
          .select('*')
          .where('id', AuthorsID)
          .first()
  }
}

module.exports = BooksService
