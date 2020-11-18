/* eslint-disable no-underscore-dangle */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../config/sqlConnectionPool');

// Setup work and export for the JWT passport strategy
function adminAuth() {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: config.get('jwtSecret'),
    };
    passport.use(
        new JwtStrategy(opts, (payload, callback) => {
            const id = payload.id;
            mysqlConnectionPool.query(
                `SELECT * FROM admin WHERE id= '${id}'`,
                (error, results) => {
                    if (error) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    } else {
                        callback(null, false);
                    }
                });
        }),
    );
}

function adminCheckAuth(req, res, next) {
    //  Get the requested web token from user
    const token = req.header('x-auth-token');

    //  If no token, deny access
    if (!token) {
        res.status(401).json({ msg: 'Unauthorised Access' });
    }

    //  Decode the web token and verify
    try {
        passport.authenticate('jwt', { session: false });
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.admin = decoded.admin;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Token is invalid' });
    }
}

exports.adminAuth = adminAuth;
exports.adminCheckAuth = adminCheckAuth;