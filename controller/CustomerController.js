import models from '../models/init-models'

async function createCustomer(req, res) {
  const { firstname, lastname, user_id } = req.body
  try {
    const result = await models.customers.create({
      firstname,
      lastname,
      user_id,
    })
    res.status(200).send({ message: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findAllCustomers(req, res) {
  try {
    const result = await models.customers.findAll()
    res.status(200).send({ message: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findCustomerById(req, res) {
  try {
    const { id } = req.params
    const result = await models.customers.findByPk(id)
    result
      ? res.status(200).send({ message: result })
      : res.send({ message: 'Customer not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findCustomerByFirstname(req, res) {
  const { firstname } = req.params
  try {
    const customer = await models.customers.findOne({
      where: {
        firstname,
      },
    })
    customer
      ? res.status(200).send({ data: customer })
      : res.status(400).send({ message: 'Username not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

// ? Menggunakan view
async function getInfoAccountCustomersView(req, res) {
  try {
    const user = await models.customeraccount.findAll()
    res.status(200).send({ message: 'Customer accounts info', data: user })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

// ? Menggunakan view di postgres
async function getCustomerOrderDetailsView(req, res) {
  try {
    const result = await models.customerortail.findAll()
    res.status(200).send({ message: 'Customer data orders', data: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function updateCustomer(req, res) {
  const { id } = req.params
  const { firstname, lastname, user_id } = req.body
  try {
    const result = await models.customers.update(
      {
        // jika nama tabel dan body sama, maka cukup di tulis satu saja
        firstname,
        lastname,
        user_id,
      },
      {
        where: { id },
      },
    )
    const updateCustomer = await models.customers.findByPk(id)
    result[0] === 1
      ? res
          .status(200)
          .send({ message: 'Customer has been updated', data: updateCustomer })
      : res.status(400).send({ message: 'Customer not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function deleteCustomer(req, res) {
  try {
    const { id } = req.params
    await models.customers.destroy({
      where: {
        id,
      },
    })
    const deleteCustomer = await models.customers.findByPk(id)
    res
      .status(200)
      .send({ message: 'Customer has been deleted!', data: deleteCustomer })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  createCustomer,
  findAllCustomers,
  findCustomerById,
  findCustomerByFirstname,
  getInfoAccountCustomersView,
  getCustomerOrderDetailsView,
  updateCustomer,
  deleteCustomer,
}
