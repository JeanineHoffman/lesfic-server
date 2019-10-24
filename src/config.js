module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://Jeanine@localhost/lesfic',
  TEST_DATABASE_URL: process.env.TEST_DB_URL || 'postgresql://Jeanine@localhost/lesfic-test',
  API_ENDPOINT: `https://lesficreads.herokuapp.com/`,
// API_KEY: process.env.REACT_APP_API_KEY,
}

