module.exports = {
    invalidToken: {
        status: 401,
        msg: "invalid token"
    },
    tokenExpired: {
        status: 401,
        msg: "token expired"
    },
    wrongPassword: {
        status: 500,
        msg: "wrong password"
    },
    nameNotExists: {
        status: 400,
        msg: "user name not exists"
    },
    nameExists: {
        status: 400,
        msg: "user name exists"
    },
    insufficientPermission: {
        status: 401,
        msg: "insufficient permission"
    },
}