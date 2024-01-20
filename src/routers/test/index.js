const express = require('express')
const testCtr = require('../../controllers/test.controller')
const route = express.Router()

route.get('/refreshToken', testCtr.testRefreshToken)

module.exports = route