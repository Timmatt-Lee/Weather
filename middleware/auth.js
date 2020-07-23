const exception = require('../exceptions');


module.exports = (ctx, next) => {
    if (!ctx.session || !ctx.session.user)
        return exception(ctx, 'user', 'insufficientPermission');
    return next();
}