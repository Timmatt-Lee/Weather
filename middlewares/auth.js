const exception = require('../exceptions');

module.exports = async (ctx, next) => {
    if (!ctx.session || !ctx.session.user)
        return exception(ctx, 'user', 'insufficientPermission');
    await next();
}