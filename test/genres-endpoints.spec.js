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


  after('clean the table', () => db.raw('TRUNCATE books RESTART IDENTITY CASCADE'))
  after('Disconnect from db', () => db.destroy());
  before('clean the table', () => db.raw('TRUNCATE books RESTART IDENTITY CASCADE'))
  afterEach('cleanup', () => db.raw('TRUNCATE books RESTART IDENTITY CASCADE'))

  describe.only(`GET /books`, () => {
    context.only(`given an genre`, () => {
      it(`responds with 200`, () => {
        return supertest(app)
          .get('/books')
          .expect(200, [])
      })
    })
    // for later use
    // context('Given there are books in the database', () => {
    //   const testbooks = makeBooksArray();
    //   beforeEach('Insert books', () => {
    //     return db
    //       .into('books')
    //       .insert(testbooks)
    //   })
    //   it('responds with 200 and all of the books', () => {
    //     return supertest(app)
    //       .get('//books')
    //       .expect(200, testbooks)
    //   })
    // })

    context(`Given an XSS attack author`, () => {
      const fakegenre = {
        id: 912,
        genre: 'fake genre <script>alert("xss");</script>',
      }
      const sanitizedbooks = [{
        id: 912,
        genre_name: 'fake genre &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      }]
      beforeEach('insert fake genre', () => {
        return db
          .into('books')
          .insert([fakegenre])
      })
      it('responds with 200 and all of the books, none of which contains XSS attack content', () => {
        return supertest(app)
          .get('/books')
          .expect(200)
          .expect(res => {
            expect(res.body[0].genre).to.eql(sanitizedbooks[0].genre)
          })
      })
    })
  })

  describe.only(`GET /books/:author`, () => {
    context.only(`Given books`, () => {
      it(`responds with 200`, () => {
        const author = 'no author'
        return supertest(app)
          .get(`/books/${author}`)
          .expect(404)
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
          .get(`/books/${authorId}`)
          .expect(200, expectedauthor)
      })
    })

    context(`Given an XSS attack author`, () => {
      const fakegenre = {
        id: 913,
        genre: 'fake genre <script>alert("xss");</script>',
      }

      beforeEach('insert malicious author', () => {
        return db
          .into('books')
          .insert([fakegenre])
      })
      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/books/${fakegenre.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.genre).to.eql('fake genre')
          })
      })
    })
  })
    
  describe(`POST /books`, () => {
    it(`creates a author, responding with 201 and the new author`, function () {
      this.retries(3);
      const newauthor = {
        genre: 'This Is a Test author Name',
        author_id: 9999
      }
      return supertest(app)
        .post('/books')
        .send(newauthor)
        .expect(201)
        .expect(res => {
          expect(res.body.genre).to.eql(newauthor.genre)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`//books/${res.body.id}`)
        })
        .then(postRes =>
          supertest(app)
            .get(`/books/${postRes.body.id}`)
            .expect(postRes.body)
        )
    })
    const requiredFields = ['genre']

    requiredFields.forEach(field => {
      const newauthor = {
        genre: 'This Is a Test'
      }
      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newgenre[field]
        return supertest(app)
          .post('/books')
          .send(newgenre)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          })
      })
    })

    context(`Given an XSS attack author`, () => {
      it(`removes any XSS attack content, and creates a author, responding with 201`, function () {
        const fakegenre = {
          id: 914,
          genre: 'fake genre <script>alert("xss");</script>'
        }
        return supertest(app)
          .post('/books')
          .send(fakegenre)
          .expect(201)
          .expect(res => {
            expect(res.body.genre).to.eql('fake genre &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
          })
      })
    })
  })
  })