const { BadRequestErr, UnAuthorizationErr } = require('../core/err.response')
const AccessRepo = require('../models/repo/access.repo')
const bcrypt = require('bcrypt')
const { generatePairToken } = require('../auth/auth.util')
const { uuid } = require('uuidv4')
const { User } = require('../models')
class AccessService {
    login = async ({ email, password }) => {
        if (!email || !password) throw new BadRequestErr('you must fill email and password!')
        const userExisted = await AccessRepo.findByEmail(email)
        if (!userExisted) throw new BadRequestErr("account haven't existed!")
        // check password
        const isPassword = bcrypt.compareSync(password, userExisted.password)
        if (!isPassword) throw new UnAuthorizationErr('password not correct!')
        // create token
        const pairToken = await generatePairToken({
            payload: {
                id: userExisted.id,
                email: userExisted.email
            },
            key: 'abc'
        })
        await userExisted.update({ refreshToken: pairToken.refreshToken }, {
            where: {
                id: userExisted.id
            }
        })
        return {
            user: userExisted,
            pairToken: pairToken
        }
    }
    register = async ({ email, password, fullName }) => {
        if (!email || !password) throw new BadRequestErr('you must fill email and password')
        const userExisted = await AccessRepo.findByEmail(email)
        if (userExisted) throw new BadRequestErr('acount have existed!')
        const createUser = await User.create({ id: uuid(), email: email, password: password, fullName });
        // get user just created
        const user = User.findByPk(createUser.id, {
            attributes: { exclude: ['password'] }
        })
        return user;
    }
}
module.exports = new AccessService;