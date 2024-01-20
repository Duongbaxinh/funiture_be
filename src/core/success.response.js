// const { reasonStatusCode, statusCode } = require('../util')


const reasonStatusCode = {
    OK: 'Successfully',
    CREATE: 'Create successfully'
}
const statusCode = {
    OK: 200,
    CREATE: 201
}
class SuccessResponse {
    constructor(
        { message = reasonStatusCode.OK,
            status = statusCode.OK,
            metadata = {} }
    ) {
        this.message = message
        this.status = status
        this.metadata = metadata
    }
    send(res) {
        res.status(this.status).json(this)
    }
}
class CREATERESPOND extends SuccessResponse {
    constructor(
        { message = reasonStatusCode.CREATE,
            status = statusCode.CREATE, metadata = {} }) {
        super(message, status, metadata);
    }
}
module.exports = { SuccessResponse, CREATERESPOND }