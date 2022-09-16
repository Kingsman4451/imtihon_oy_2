import { read, write } from '#model'
import { AuthorizationError, InternalServerError } from '#errors'
import jwt from '../utilts/jwt.js'
import sha256 from 'sha256'

const LOGIN = (req, res, next) => {
  try {
    let admins = read('admins')
    let{ username, password } = req.body
    let admin = admins.find(user => user.username == username && user.password == sha256(password));

    if(!admin){
      return next(new AuthorizationError(401, 'Invalid username or password'));
    }

    return res.status(200).json({
      status: 200,
      message: 'ok',
      token: jwt.sign({user_id: admin.user_id})
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}




export default {
  LOGIN
}