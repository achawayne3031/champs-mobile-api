import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
const env = require('dotenv').config({ debug: process.env.DEBUG })
const user = require('./routes/user')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

const app = express()
app.use(
  cors({
    origin: ['*'],
  }),
)

app.use(limiter)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json',
  )
  next()
})

// Parse incoming requests data
app.use(express.urlencoded({ extended: true }))

// app.use('./middleware/cors', cors);
app.use('/api', user)

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught Exception: ${error}`)
})

const hostname = process.env.HOSTNAME || 'localhost' // config.get('hostname') || 'localhost';
const port = process.env.PORT || 4000 // config.get('port') || 5000;

console.log(`App is listening on ${hostname}: ${port}`)

app.use(express.json())
app.listen(port)
