const { expect } = require('chai');
const moment = require('moment');
const knex = require('knex');
const app = require('../src/app');
const { makegenresArray } = require('./genres.fixtures');
const { makeauthorsArray } = require('./authors.fixtures');


describe('genres Endpoints', () => {
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
  after('Clean the genres table', () => db('genres').truncate());
  after('clean the table', () => db.raw('TRUNCATE genres, authors RESTART IDENTITY CASCADE'))
  after('Disconnect from db', () => db.destroy());
  before('clean the table', () => db.raw('TRUNCATE genres, authors RESTART IDENTITY CASCADE'))
  afterEach('cleanup',() => db.raw('TRUNCATE genres RESTART IDENTITY CASCADE'))

  before('Insert authors', () => {
    const testauthors = makeauthorsArray()
    return db
      .into('authors')
      .insert(testauthors)
  })

  describe(`GET /api/genres`, () => {
    context(`Given no genres`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/genres')
          .expect(200, [])
      })
    })

    context('Given there are genres in the database', () => {
      const testgenres = makegenresArray()

      beforeEach('Insert genres', () => {
        return db
          .into('genres')
          .insert(testgenres)
      })
      afterEach('Clean the genres table', () => db('genres').truncate());

      it('responds with 200 and all of the genres', () => {
        return supertest(app)
          .get('/api/genres')
          .expect(200, testgenres)
      })
    })

  //   context(`Given an XSS attack genre`, () => {
  //     const maliciousgenre = {
  //       id: 911,
  //       author_id: 2,
  //       genre_title: 'Naughty naughty very naughty <script>alert("xss");</script>',
  //       content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  //     }

  //     const sanitizedgenres = [{
  //       id: 911,
  //       author_id: 2,
  //       genre_title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
  //       content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  //     }]

  //     beforeEach('insert malicious genre', () => {
  //       return db
  //         .into('genres')
  //         .insert([maliciousgenre])
  //     })

  //     it('responds with 200 and all of the genres, none of which contains XSS attack content', () => {
  //       return supertest(app)
  //         .get('/api/genres')
  //         .expect(200)
  //         .expect(res => {
  //           expect(res.body[0].genre_title).to.eql(sanitizedgenres[0].genre_title)
  //           expect(res.body[0].content).to.eql(sanitizedgenres[0].content)
  //         })
  //     })
  //   })
  // })

  // describe(`GET /api/genres/:genre_id`, () => {
  //   context(`Given no genres`, () => {
  //     it(`responds with 404`, () => {
  //       const genreId = 123456
  //       return supertest(app)
  //         .get(`/api/genres/${genreId}`)
  //         .expect(404, { error: { message: `genre doesn't exist` } })
  //     })
  //   })

    // context('Given there are genres in the database', () => {
    //   const testgenres = makegenresArray()

    //   beforeEach('Insert genres', () => {
    //     return db
    //       .into('genres')
    //       .insert(testgenres)
    //   })

    //   it('responds with 200 and the specified genre', () => {
    //     const genreId = 2
    //     const expectedgenre = testgenres[genreId - 1]
    //     return supertest(app)
    //       .get(`/api/genres/${genreId}`)
    //       .expect(200, expectedgenre)
    //   })
    // })

  //   context(`Given an XSS attack genre`, () => {
  //     const maliciousgenre = {
  //       genre_title: 'Naughty naughty very naughty <script>alert("xss");</script>',
  //       content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  //     }

  //     beforeEach('insert malicious genre', () => {
  //       return db
  //         .into('genres')
  //         .insert([maliciousgenre])
  //     })

  //     it('removes XSS attack content', () => {
  //       return supertest(app)
  //         .get(`/api/genres/${maliciousgenre.id}`)
  //         .expect(200)
  //         .expect(res => {
  //           expect(res.body.genre_title).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
  //           expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
  //         })
  //     })
  //   })
  // })

  // describe(`POST /api/genres`, () => {
  //   it(`creates a genre, responding with 201 and the new genre`, function () {
  //     this.retries(3);
  //     const newgenre = {
  //       genre_title: 'This Is a Test genre Title',
  //       content: 'Testing new genre content...',
  //       author_id: 2
  //     }
  //     return supertest(app)
  //       .post('/api/genres')
  //       .send(newgenre)
  //       .expect(201)
  //       .expect(res => {
  //         expect(res.body.genre_title).to.eql(newgenre.genre_title)
  //         expect(res.body.content).to.eql(newgenre.content)
  //         expect(res.body.author_id).to.eql(newgenre.author_id)
  //         expect(res.body).to.have.property('id')
  //         expect(res.headers.location).to.eql(`/api/genres/${res.body.id}`)
  //         const expectedDate = new Date().toLocaleString();
  //         const actualDate = new Date(res.body.date_modified).toLocaleString();
  //         expect(actualDate).to.eql(expectedDate)
  //       })
  //       .then(postRes =>
  //         supertest(app)
  //           .get(`/api/genres/${postRes.body.id}`)
  //           .expect(postRes.body)
  //       )
  //   })
    // const requiredFields = ['content', 'author_id', 'genre_title']

    // requiredFields.forEach(field => {
    //   const newgenre = {
    //     genre_title: 'This Is a Test genre Title',
    //     content: 'Testing new genre content...',
    //     author_id: '2'
    //   }
    //   it(`responds with 400 and an error message when the '${field}' is missing`, () => {
    //     delete newgenre[field]
    //     return supertest(app)
    //       .post('/api/genres')
    //       .send(newgenre)
    //       .expect(400, {
    //         error: { message: `Missing '${field}' in request body` }
    //       })
    //   })
    // })

  //   context(`Given an XSS attack genre`, () => {
  //     it(`removes any XSS attack content, and creates a genre, responding with 201`, function () {
  //       const maliciousgenre = {
  //           id: 911,
  //           author_id: 2,
  //           genre_title: 'Naughty naughty very naughty <script>alert("xss");</script>',
  //           content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  //       }
  //       return supertest(app)
  //         .post('/api/genres')
  //         .send(maliciousgenre)
  //         .expect(201)
  //         .expect(res => {
  //           expect(res.body.genre_title).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
  //           expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
  //         })
  //     })
  //   })
  // })

  // describe(`DELETE /api/genres/:genre_id`, () => {
  //   context('Given there are genres in the database', () => {
  //     const testgenres = makegenresArray()

  //     beforeEach('Insert genres', () => {
  //       return db
  //         .into('genres')
  //         .insert(testgenres)
  //     })

  //     it('responds with 204 and removes the genre', () => {
  //       const idToRemove = 2
  //       const expectedgenres = testgenres.filter(genre => genre.id !== idToRemove)
  //       return supertest(app)
  //         .delete(`/api/genres/${idToRemove}`)
  //         .expect(204)
  //         .then(res =>
  //           supertest(app)
  //             .get(`/api/genres`)
  //             .expect(expectedgenres)
  //         )
  //     })
  //   })
  //   context(`Given no genres`, () => {
  //     it(`responds with 404`, () => {
  //       const genreId = 123456
  //       return supertest(app)
  //         .delete(`/api/genres/${genreId}`)
  //         .expect(404, { error: { message: `genre doesn't exist` } })
  //     })
  //   })
  // })

  // describe(`PATCH /api/genres/:genre_id`, () => {
  //   context(`Given no genres`, () => {
  //     it(`responds with 404`, () => {
  //       const genreId = 123456
  //       return supertest(app)
  //         .patch(`/api/genres/${genreId}`)
  //         .expect(404, { error: { message: `genre doesn't exist` } })
  //     })
  //   })
    // context('Given there are genres in the database', () => {
    //   const testgenres = makegenresArray()
    //   beforeEach('Insert genres', () => {
    //     return db
    //       .into('genres')
    //       .insert(testgenres)
    //   })

    //   it('responds with 204 and updates the genre', () => {
    //     const idToUpdate = 2
    //     const updatedgenre = {
    //       content: 'This genre content has been updated',
    //     }
    //     const expectedgenre = {
    //       ...testgenres[idToUpdate - 1],
    //       ...updatedgenre
    //     }
      //   return supertest(app)
      //     .patch(`/api/genres/${idToUpdate}`)
      //     .send(updatedgenre)
      //     .expect(204)
      //     .then(res =>
      //       supertest(app)
      //         .get(`/api/genres/${idToUpdate}`)
      //         .expect(expectedgenre)
      //     )
      // })
      // it(`responds with 400 when no required fields supplied`, () => {
      //   const idToUpdate = 2
      //   return supertest(app)
      //     .patch(`/api/genres/${idToUpdate}`)
      //     .send({ irrelevantField: 'foo' })
      //     .expect(400, {
      //       error: {
      //         message: `Request body must contain 'content'`
      //       }
      //     })
      // })
    })
  })
