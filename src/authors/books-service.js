const BooksService = {
  getAllAuthors(knexInstance) {
      return knexInstance.select('*').from('books')
  },

  getByAuthor(knexInstance, author) {
      return knexInstance
          .from('books')
          .select('*')
          .where("author", author)
          .first() //might need to remove
  }
}

module.exports = BooksService
