process.env.TZ='UTC'
require('dotenv')

onst { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest