const { reasonStatusCode, statusCode } = require('../util')

class ErrResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
class BadRequestErr extends ErrResponse {
    constructor(message = reasonStatusCode.BAD_REQUEST,
        status = statusCode.BAD_REQUEST) {
        super(message, status)
    }
}
class ForbidenErr extends ErrResponse {
    constructor(
        message = reasonStatusCode.FORBIDDEN,
        status = statusCode.FORBIDDEN) {
        super(message, status);
    }
}
class NotFoundErr extends ErrResponse {
    constructor(message = reasonStatusCode.NOT_FOUND,
        status = statusCode.NOT_FOUND) {
        super(message, status);
    }
}
class UnAuthorizationErr extends ErrResponse {
    constructor(
        message = reasonStatusCode.UNAUTHORIZED,
        status = statusCode.UNAUTHORIZED) {
        super(message, status);

    }

}
module.exports = {
    ErrResponse,
    BadRequestErr,
    ForbidenErr,
    UnAuthorizationErr
}