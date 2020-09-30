const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan')

const pokemonRoutes = require('./routes/pokemon')

const port = 1337

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    next()
})

app.use('/pokemon', pokemonRoutes)
app.use('/sprites', express.static(path.join(__dirname,'sprites')))

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
