import models from '../models/init-models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function registerUser(req, res) {
  const { username, password } = req.body
  try {
    const result = await models.users.create({
      username,
      password: bcrypt.hashSync(password, 10),
    })

    res.status(200).send({ message: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body
  try {
    const user = await models.users.findOne({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(404).send({ message: 'Username not found' })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid password!' })
    }

    const token = jwt.sign({ username: username }, process.env.SECRET_KEY)

    res.status(200).send({
      message: 'Berhasil login',
      username: username,
      accessToken: token,
      user: user,
    })
  } catch (error) {
    if (!res.headerSent) {
      res.status(400).send({ message: error })
    }
  }
}

async function checkToken(req, res, next) {
  const { authorization } = req.headers

  try {
    const verifyToken = jwt.verify(authorization, process.env.SECRET_KEY)

    if (!verifyToken.username) {
      return res.status(401).send({ message: 'invalid access token' })
    }
    next()
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default { loginUser, registerUser, checkToken }
