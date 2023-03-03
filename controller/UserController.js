// async function createUserAndCustomer(req, res) {
//   const { firstname, lastname, username, password } = req.body
//   try {
//     let user = await models.users.create({
//       username,
//       password,
//     })

//     let customer = await models.customers.create({
//       firstname,
//       lastname,
//       customer_user_id: user.user_id,
//     })

//     return res.status(201).json({
//       message: 'create user and customer successfully',
//       data: {
//         user,
//         customer,
//       },
//     })
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({
//       message: 'Internal server error',
//     })
//   }
// }

// async function getInfoAccountCustomers(req, res) {
//   try {
//     // const userId = req.params.userId;
//     const { userId } = req.params
//     // get user and customer information using Sequelize models
//     const user = await models.users.findOne({
//       // select username and password from users table
//       attributes: ['username', 'password'],
//       where: { user_id: userId },
//       include: [
//         {
//           model: customers,
//           // join with customers table and select firstname and lastname
//           attributes: ['firstname', 'lastname'],
//         },
//       ],
//     })
//     res.status(200).json(user)
//   } catch (error) {
//     res.status(500).json({ message: 'Something wrong!' })
//   }
// }

import models from '../models/init-models'
import bcrypt from 'bcrypt'

async function createUser(req, res) {
  const { username, password } = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const passHash = await bcrypt.hash(password, salt)
    const result = await models.users.create({
      username,
      password: passHash,
    })
    res.status(200).send({ message: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findAllUsers(req, res) {
  try {
    const result = await models.users.findAll()
    res.status(200).send({ message: result })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error })
  }
}

async function updateUser(req, res) {
  const { id } = req.params
  const { username, password } = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const passHash = await bcrypt.hash(password, salt)
    const [rowsUpdated, [updatedUser]] = await models.users.update(
      {
        username,
        password: passHash,
      },
      {
        returning: true, // mengembalikan data yang diperbarui
        where: { id },
      },
    )

    if (rowsUpdated === 0) {
      return res.status(400).send({ message: 'User not found' })
    }

    res
      .status(200)
      .send({ message: 'User has been updated', result: updatedUser })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findUserById(req, res) {
  const { id } = req.params
  try {
    const result = await models.users.findByPk(id)
    result
      ? res.status(200).send({ message: result })
      : res.send({ message: 'User not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findUserByUsername(req, res) {
  const { username } = req.params
  try {
    const user = await models.users.findOne({
      where: {
        username,
      },
    })
    user
      ? res.status(200).send({ data: user })
      : res.status(400).send({ message: 'Username not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function deleteUser(req, res) {
  const { id } = req.params
  try {
    await models.users.destroy({
      where: {
        id,
      },
    })
    const deleteUser = await models.users.findByPk(id)
    res
      .status(200)
      .send({ message: 'User has been deleted!', data: deleteUser })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  findAllUsers,
  createUser,
  updateUser,
  findUserById,
  findUserByUsername,
  deleteUser,
}
