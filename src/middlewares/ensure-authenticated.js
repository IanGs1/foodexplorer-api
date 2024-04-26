const { verify } = require('jsonwebtoken');
const authConfig = require('../config/jwt-config');

function ensureAuthenticated(request, reply, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        console.log("JWT Token has not been informed")

        return reply.status(401).json({
            status: "Error",
            message: "JWT Token has not been informed",
        });
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