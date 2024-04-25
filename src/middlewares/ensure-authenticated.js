const { verify,  } = require('jsonwebtoken');
const authConfig = require('../config/jwt-config');

const AppError = require('../utils/AppError');

function ensureAuthenticated(request, reply, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        console.log("JWT Token has not been informed")

        throw new AppError("JWT Token has not been informed", 401);
    };

    const [, token] = authHeader.split(' ');

    try {        
        const { sub: userId } = verify(token, authConfig.secret);

        request.user = {
            id: String(userId),
        };

        next();
    } catch {
        return reply.status(400).json({
            status: "Error",
            message: "JWT Token invalid!",
        });
    };
};

module.exports = ensureAuthenticated;