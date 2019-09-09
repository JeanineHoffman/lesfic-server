const { expect } = require('chai');
const moment = require('moment');
const knex = require('knex');
const app = require('../src/app');
const { makeBooksArray } = require('./books.fixtures');


describe.only('books endpoint', () => {
  let db;

  before('Make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db);
  })

  // Good Database Hygiene: Make sure that tables are clear
  // of data before we begin testing, and disconnect from
  // the database after testing is complete
  after('clean the table', () => db.raw('TRUNCATE books RESTART IDENTITY CASCADE'))
  after('Disconnect from db', () => db.destroy());
  before('clean the table', () => db.raw('TRUNCATE books RESTART IDENTITY CASCADE'))
  afterEach('cleanup', () => db.raw('TRUNCATE books RESTART IDENTITY CASCADE'))

  describe.only(`GET /api/books`, () => {
    context.only(`given an author name`, () => {
      it(`responds with 200`, () => {
        return supertest(app)
          .get('/api/books')
          .expect(200, [])
      })
    })

    // context('Given there are books in the database', () => {
    //   const testbooks = makeBooksArray();
    //   beforeEach('Insert books', () => {
    //     return db
    //       .into('books')
    //       .insert(testbooks)
    //   })
    //   it('responds with 200 and all of the books', () => {
    //     return supertest(app)
    //       .get('/api/books')
    //       .expect(200, testbooks)
    //   })
    // })

    context(`Given an XSS attack author`, () => {
      const maliciousauthor = {
        id: 912,
        author_name: 'bob jones <script>alert("xss");</script>',
      }
      const sanitizedbooks = [{
        id: 912,
        author_name: 'bob jones &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      }]
      beforeEach('insert malicious author', () => {
        return db
          .into('books')
          .insert([maliciousauthor])
      })
      it('responds with 200 and all of the books, none of which contains XSS attack content', () => {
        return supertest(app)
          .get('/api/books')
          .expect(200)
          .expect(res => {
            expect(res.body[0].author_name).to.eql(sanitizedbooks[0].author_name)
          })
      })
    })
  })

  describe.only(`GET /api/books/:author_id`, () => {
    context.only(`Given books`, () => {
      it(`responds with 200`, () => {
        const authorId = 123456
        return supertest(app)
          .get(`/api/books/${authorId}`)
          .expect(200, [] })
      })
    })

    context('Given there are books in the database', () => {
      const testbooks = makeBooksArray()
      beforeEach('Insert books', () => {
        return db
          .into('books')
          .insert(testbooks)
      })
      it('responds with 200 and the specified author', () => {
        const authorId = 2
        const expectedauthor = testbooks[authorId - 1]
        return supertest(app)
          .get(`/api/books/${authorId}`)
          .expect(200, expectedauthor)
      })
    })

    context(`Given an XSS attack author`, () => {
      const maliciousauthor = {
        id: 913,
        author_name: 'bob jones <script>alert("xss");</script>',
      }

      beforeEach('insert malicious author', () => {
        return db
          .into('books')
          .insert([maliciousauthor])
      })
      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/books/${maliciousauthor.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.author_name).to.eql('bob jones')
          })
      })
    })
  })
    
  describe(`POST /api/books`, () => {
    it(`creates a author, responding with 201 and the new author`, function () {
      this.retries(3);
      const newauthor = {
        author_name: 'This Is a Test author Name',
        author_id: 9999
      }
      return supertest(app)
        .post('/api/books')
        .send(newauthor)
        .expect(201)
        .expect(res => {
          expect(res.body.author_name).to.eql(newauthor.author_name)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/api/books/${res.body.id}`)
        })
        .then(postRes =>
          supertest(app)
            .get(`/api/books/${postRes.body.id}`)
            .expect(postRes.body)
        )
    })
    const requiredFields = ['author_name']

    requiredFields.forEach(field => {
      const newauthor = {
        author_name: 'This Is a Test author Name'
      }
      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newauthor[field]
        return supertest(app)
          .post('/api/books')
          .send(newauthor)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          })
      })
    })

    context(`Given an XSS attack author`, () => {
      it(`removes any XSS attack content, and creates a author, responding with 201`, function () {
        const maliciousauthor = {
          id: 914,
          author_name: 'bob jones <script>alert("xss");</script>'
        }
        return supertest(app)
          .post('/api/books')
          .send(maliciousauthor)
          .expect(201)
          .expect(res => {
            expect(res.body.author_name).to.eql('bob jones &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
          })
      })
    })
  })
  })