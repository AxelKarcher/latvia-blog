function getToken (jwt, req) {
  return jwt.verify(req?.headers?.authorization.split(' ')[1], process.env.TOKEN_SECRET)
}

module.exports = {getToken}