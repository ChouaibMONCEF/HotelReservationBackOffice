const express = require('express');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')

const userRoutes = require('./routes/User')
const globalErrHandler = require('./controllers/errorController')
const AppError = require('./utils/appError')
const app = express()

app.use(cors())
app.use(helmet())
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again later'
})
app.use('/api', limiter)

app.use(express.json({
    limit: '15kb'
}))

app.use(mongoSanitize())

app.use(xss())

app.use(hpp())

app.use('/api/users', userRoutes)

app.use('*', (req, res, next) => {
    const err = new AppError(404, 'Fail', 'Undefined route')
    next(err, req, res, next)
})

app.use(globalErrHandler)

module.exports = app