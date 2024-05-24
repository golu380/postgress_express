// import CustomErrorHandler from '../services/CustomErrorHandler'
// import JwtService from '../services/JwtService'
const CustomErrorHandler = require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService')

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization
  console.log(authHeader)
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized('No Token in here'))
  }
  const token = authHeader.split(' ')[1]

  try {
    const { id, full_name, email, username, isAdmin } = JwtService.verify(token)

    const user = {
      id,
      full_name,
      email,
      username,
      isAdmin
    }
    req.user = user
    next()
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized('something Went Wrong'))
  }
}

module.exports = auth;
