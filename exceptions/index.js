'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const exceptions = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const exception = require(path.join(__dirname, file));
        exceptions[file.slice(0, file.indexOf('.'))] = exception;
    });

function getStackTrace() {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};

async function response(ctx, genre, exception) {
    if (exceptions[genre][exception] == undefined) {
        genre = 'api';
        exception = 'unexpectedError';
    }

    ctx.status = exceptions[genre][exception].status;

    var data = {
        msg: exceptions[genre][exception].msg,
        requestId: ctx.state.id
    }

    if (process.env.APP_DEBUG)
        data.trace = getStackTrace();

    ctx.body = data;
}

module.exports = response;
