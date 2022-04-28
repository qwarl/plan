const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const port = 3000


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const route = require('./routes/index')

route(app);

//CONNECT MONGODB
const db = require('./config/db/index.js')
//Database connection
db.connect();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})