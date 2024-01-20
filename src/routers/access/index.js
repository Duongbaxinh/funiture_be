const express = require('express')
const AccessCtr = require('../../controllers/access.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const route = express.Router()

route.post('/register', asyncHandler(AccessCtr.register))
route.post('/login', asyncHandler(AccessCtr.login))

module.exports = route;