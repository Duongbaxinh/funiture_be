'use strict'
const express = require('express')
const app = express();
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const cookieParse = require('cookie-parser')
// middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(cookieParse())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// config db

// route
app.use('/api/v1', require('./routers'))

// handle err
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        code: statusCode,
        status: 'error',
        message,
    })
})
module.exports = app;