module.exports = {
    invalidToken: {
        status: 401,
        msg: "invalid token"
    },
    tokenExpired: {
        status: 401,
        msg: "token expired"
    },
    usernameExists: {
        status: 400,
        msg: " user name exists"
    },
    usernameNotExists: {
        status: 400,
        msg: "user name not exists"
    }
}