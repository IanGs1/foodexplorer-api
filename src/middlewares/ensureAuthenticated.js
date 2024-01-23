const AppError = require("../utils/AppError");

const authConfig = require("../config/auth");
const { verify } = require("jsonwebtoken");

function ensureAuthenticated(request, reply, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("JWT Token é necessário!", 401);
  }

  [, token] = authHeader.split(" ");
  
  try {
    const { sub: userId } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: userId,
    }

    return next();
  } catch {
    throw new AppError("O Token passado não é válido!", 401);
  }
};

module.exports = ensureAuthenticated;