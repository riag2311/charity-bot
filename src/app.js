// Import all required dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Start the express app
const app = express()

// Enable the server to receive requests from clients in a different domain/origin
app.use(cors())
app.options('*', cors())

// Body parser is used to parse incominng requests as required
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Morgan allows us to log and debug every request coming into the server file
app.use(morgan('combined'))

// Default route which can be viewed on a browser just to check if the app is live
app.get('/', (req, res) => {
  res.status(200).send('This is the Webex bot for Concur. It is live.')
})

// Require all routes
require('./routes/webhookRoutes')(app) // Route all reminder related API calls

// Default error message when no route is matched
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 400
  next(error)
})

// Error handler for all errors
app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message,
      status: error.status
    }
  })
})

// Run the server and log the port it is running on
app.listen(process.env.PORT || 3000, () => console.log('Listening on port:', process.env.PORT || 3000))
