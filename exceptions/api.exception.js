module.exports = {
    unexpectedError: {
        status: 400,
        msg: "unexpected error"
    },
    invalidParameter: {
        status: 400,
        msg: "invalid parameter"
    },
    insufficientPermission: {
        status: 401,
        msg: "insufficient permission"
    },
    failedValidation: {
        status: 400,
        msg: "failed validation"
    },
    apiNotFound: {
        status: 404,
        msg: "api not found"
    },
    methodNotAllowed: {
        status: 400,
        msg: "method not allowed"
    }
}