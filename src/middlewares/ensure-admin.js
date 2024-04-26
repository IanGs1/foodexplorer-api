function ensureAdmin(request, reply, next) {
  const { role: userRole } = request.user;

  if (userRole !== "admin") {
    return reply.status(401).send({
      status: "error",
      message: "User has no permission to access this route!",
    });
  };

  return next();
};

module.exports = ensureAdmin;