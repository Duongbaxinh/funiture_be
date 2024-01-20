const { UnAuthorizationErr } = require('../core/err.response')
const JWT = require('jsonwebtoken');
const { promisify } = require('util')
const { asyncHandler } = require('../helper/asyncHandler');
const HEADER = {
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-freshtoken'
}
const asyncVeryfyToken = promisify(JWT.verify);

const authorization = asyncHandler(async (req, res, next) => {
    const token = req.headers[HEADER.AUTHORIZATION];
    if (!token) throw new UnAuthorizationErr('UnAuthorization please login before!')
    const user = await asyncVeryfyToken(token, 'abc')
    if (!user) throw new UnAuthorizationErr('token not correct!')
    req.user = user;
    next();
})

module.exports = { authorization }