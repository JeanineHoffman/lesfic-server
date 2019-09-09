// const { expect } = require('chai');
// const moment = require('moment');
// const knex = require('knex');
// const app = require('../src/app');
// const { makeGenresArray } = require('./genres.fixtures');


// describe('genres endpoint', () => {
//   let db;

//   before('Make knex instance', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DB_URL,
//     })
//     app.set('db', db);
//   })
// })
// // Good Database Hygiene: Make sure that tables are clear
// // of data before we begin testing, and disconnect from
// // the database after testing is complete
// after('clean the table', () => db.raw('TRUNCATE genres RESTART IDENTITY CASCADE'))
// after('Disconnect from db', () => db.destroy());
// before('clean the table', () => db.raw('TRUNCATE genres RESTART IDENTITY CASCADE'))
// afterEach('cleanup', () => db.raw('TRUNCATE genres RESTART IDENTITY CASCADE'))

// describe.only(`GET /api/books`, () => {
//   context.only(`Given no genres`, () => {
//     it(`responds with 200 and an empty list`, () => {
//       return supertest(app)
//         .get('/api/books')
//         .expect(200, [])
//     })
//   })

//   // context('Given there are genres in the database', () => {
//   //   const testgenres = makeGenresArray();
//   //   beforeEach('Insert genres', () => {
//   //     return db
//   //       .into('genres')
//   //       .insert(testgenres)
//   //   })
//   it('responds with 200 and all of the genres', () => {
//     return supertest(app)
//       .get('/api/books')
//       .expect(200, testgenres)
//   })
// })

// context(`Given an XSS attack genre`, () => {
//   const maliciousgenre = {
//     id: 912,
//     genre_name: 'bob jones <script>alert("xss");</script>',
//   }
//   const sanitizedgenres = [{
//     id: 912,
//     genre_name: 'bob jones &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
//   }]
//   beforeEach('insert malicious genre', () => {
//     return db
//       .into('genres')
//       .insert([maliciousgenre])
//   })
//   it('responds with 200 and all of the genres, none of which contains XSS attack content', () => {
//     return supertest(app)
//       .get('/api/books')
//       .expect(200)
//       .expect(res => {
//         expect(res.body[0].genre_name).to.eql(sanitizedgenres[0].genre_name)
//       })
//   })
// })
  

// describe.only(`GET /api/books/:genre_id`, () => {
//   context.only(`Given no genres`, () => {
//     it(`responds with 404`, () => {
//       const genreId = 123456
//       return supertest(app)
//         .get(`/api/books/${genreId}`)
//         .expect(404, { error: { message: `genre doesn't exist` } })
//     })
//   })

//   context('Given there are genres in the database', () => {
//     const testgenres = makeGenresArray()
//     beforeEach('Insert genres', () => {
//       return db
//         .into('genres')
//         .insert(testgenres)
//     })
//     it('responds with 200 and the specified genre', () => {
//       const genreId = 2
//       const expectedgenre = testgenres[genreId - 1]
//       return supertest(app)
//         .get(`/api/books/${genreId}`)
//         .expect(200, expectedgenre)
//     })
//   })

//   context(`Given an XSS attack genre`, () => {
//     const maliciousgenre = {
//       id: 913,
//       genre_name: 'bob jones <script>alert("xss");</script>',
//     }

//     beforeEach('insert malicious genre', () => {
//       return db
//         .into('genres')
//         .insert([maliciousgenre])
//     })
//     it('removes XSS attack content', () => {
//       return supertest(app)
//         .get(`/api/books/${maliciousgenre.id}`)
//         .expect(200)
//         .expect(res => {
//           expect(res.body.genre_name).to.eql('bob jones')
//         })
//     })
//   })
// })

// describe(`POST /api/books`, () => {
//   it(`creates a genre, responding with 201 and the new genre`, function () {
//     this.retries(3);
//     const newgenre = {
//       genre_name: 'This Is a Test genre Name',
//       genre_id: 9999
//     }
//     return supertest(app)
//       .post('/api/books')
//       .send(newgenre)
//       .expect(201)
//       .expect(res => {
//         expect(res.body.genre_name).to.eql(newgenre.genre_name)
//         expect(res.body).to.have.property('id')
//         expect(res.headers.location).to.eql(`/api/books/${res.body.id}`)
//       })
//       .then(postRes =>
//         supertest(app)
//           .get(`/api/books/${postRes.body.id}`)
//           .expect(postRes.body)
//       )
//   })
//   const requiredFields = ['genre_name']

//   requiredFields.forEach(field => {
//     const newgenre = {
//       genre_name: 'This Is a Test genre Name'
//     }
//     it(`responds with 400 and an error message when the '${field}' is missing`, () => {
//       delete newgenre[field]
//       return supertest(app)
//         .post('/api/books')
//         .send(newgenre)
//         .expect(400, {
//           error: { message: `Missing '${field}' in request body` }
//         })
//     })
//   })

//   context(`Given an XSS attack genre`, () => {
//     it(`removes any XSS attack content, and creates a genre, responding with 201`, function () {
//       const maliciousgenre = {
//         id: 914,
//         genre_name: 'bob jones <script>alert("xss");</script>'
//       }
//       return supertest(app)
//         .post('/api/books')
//         .send(maliciousgenre)
//         .expect(201)
//         .expect(res => {
//           expect(res.body.genre_name).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
//         })
//     })
//   })
// })
  