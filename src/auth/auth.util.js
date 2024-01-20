const { promisify } = require('util')
const JWT = require('jsonwebtoken')
const signToken = promisify(JWT.sign)
const generatePairToken = async ({ payload, key }) => {
    const accessToken = await signToken(payload, key, { expiresIn: '2d' })
    const refreshToken = await signToken(payload, key, { expiresIn: "7d" })
    return { accessToken, refreshToken }
}
module.exports = {
    generatePairToken
}