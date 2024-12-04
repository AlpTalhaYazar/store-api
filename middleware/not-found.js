import { StatusCodes } from 'http-status-codes';
import Result from '../utils/Result';

const notFound = (req, res) =>
    res.status(StatusCodes.NOT_FOUND)
        .json(Result.failure('Route does not exist'));

module.exports = notFound;
