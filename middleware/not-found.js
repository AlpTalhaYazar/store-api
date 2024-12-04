const { StatusCodes } = require('http-status-codes')
const Result = require('../utils/Result')

const notFound = (req, res) =>
    res.status(StatusCodes.NOT_FOUND)
        .json(Result.failure('Route does not exist'));

module.exports = notFound;
