// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')
// import { JWT_SECRET } from '../config'
const {JWT_SECRET} = require('../config/index')
class JwtService {
  static sign (payload, expiry = '15d', secret = JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry })
  }
  static verify (token, secret = JWT_SECRET) {   
    return jwt.verify(token, secret)
  }
}


module.exports = JwtService