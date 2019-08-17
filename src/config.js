module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://Jeanine@localhost/lesfic',
  TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://Jeanine@localhost/lesfic-test',
  API_ENDPOINT: `https://.herokuapp.com/`,
API_KEY: process.env.REACT_APP_API_KEY,
}
