// protect routes with user authentication

import { connectDB } from './db';

let db;

/**
 * not a real express next but its work great that way to handle errors
 * @param res
 * @return {function(*=): *}
 */
const next = res => err => res.json(err);

export const middleware = (handler, options = {}) => async (req, res) => {
    console.log('f: middleware')

    // return handler(req, res, next(res));
    if (options.db) {
        try {
            if (!db) db = await connectDB();
            req.db = db
        } catch (e) {
            return next(res)({status: 666, message: "Fehler", error: e})
        }
    }


    if (options.auth) {

    }
    if (options.cors) {

    }
    return handler(req, res, next(res));
};

export default middleware;
