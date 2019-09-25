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
  },
    insertAuthor(knex, newAuthor) {
    return knex
      .insert(newAuthor)
      .into('books')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
}

module.exports = BooksService
