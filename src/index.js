const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const PORT = 3000


// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

//cors config
var cors = require('cors')
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const route = require('./routes/index')

route(app);

require('dotenv').config({ path: __dirname + '/.env' })
// require('dotenv').config()

//CONNECT MONGODB
const db = require('./config/db/index')
//Database connection
db.connect();

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})