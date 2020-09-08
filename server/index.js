const express = require("express");
const app = express();
const port = process.env.port || 3000
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')


require("./config/dbConfig");

app.use(bodyParser.json({ limit: "50mb", extended: true }))
  .use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
  .use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*') // allow request from all origin
    response.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    response.header(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  .use('/user', userRoutes)

const server = app.listen(port, () => {
  console.info(`${process.env.NODE_ENV} server is running at http://localhost:${port}`)
})


