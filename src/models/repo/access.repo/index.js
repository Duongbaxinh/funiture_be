const { User } = require('../../index')
class AccessRepo {

    findByEmail = async (email) => {
        return User.findOne({
            where: {
                email: email
            },
            attributes: { exclude: ['refreshToken', 'createAt', 'updateAt'] }
        })
    }
}
module.exports = new AccessRepo