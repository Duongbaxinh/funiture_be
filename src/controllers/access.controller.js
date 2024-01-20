const { CREATERESPOND, SuccessResponse } = require("../core/success.response");
const logger = require('../debug')
const AccessService = require('../services/access.service')
class AccessCtr {
    /**
     * 
     * @param {email:'exam@gmail.com',password:'123456'} req 
     * @param {user:{},token:''} res 
     */
    login = async (req, res) => {
        const metadata = await AccessService.login(req.body)
        // res.cookie('refreshToken', metadata.pairToken.refreshToken, {
        //     httpOnly: true
        // })
        console.log('medddddddddddd', metadata)
        new SuccessResponse({
            message: "login successfully",
            metadata: metadata
        }).send(res)
    }
    /**
      * 
      * @param {email:'exam@gmail.com',password:'123456'} req 
      * @param {user:{}} res 
      */
    register = async (req, res) => {
        new SuccessResponse({
            message: 'register successfull',
            metadata: await AccessService.register(req.body)
        }).send(res)
    }
}
module.exports = new AccessCtr();