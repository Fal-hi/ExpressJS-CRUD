import models from '../models/init-models'

async function findAllOrders(req, res) {
  try {
    const orders = await models.orders.findAll()
    res.status(200).send({ message: 'All data orders', data: orders })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function createOrder(req, res) {
  const { total_product, total_price, user_id } = req.body
  try {
    const order = await models.orders.create({
      total_product,
      total_price,
      user_id,
    })
    res.status(200).send({ message: 'Successfully create order', data: order })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function updateOrder(req, res) {
  const { id } = req.params
  const { total_product, total_price, user_id } = req.body
  try {
    const order = await models.orders.update(
      {
        total_product,
        total_price,
        user_id,
      },
      {
        where: { id },
      },
    )
    const updateProCat = await models.orders.findByPk(id)
    order[0] === 1
      ? res.status(200).send({
          message: 'Order detail has been updated',
          data: updateProCat,
        })
      : res.status(400).send({ message: 'Order detail not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findOrderById(req, res) {
  const { id } = req.params
  try {
    const order = await models.orders.findByPk(id)
    console.log(order)
    order
      ? res.status(200).send({ data: order })
      : res.send({ message: 'Order detail not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function deleteOrder(req, res) {
  const { id } = req.params
  try {
    const order = await models.orders.destroy({
      where: {
        id,
      },
    })
    res
      .status(200)
      .send({ message: 'Order detail has been deleted!', data: order })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  findAllOrders,
  createOrder,
  updateOrder,
  findOrderById,
  deleteOrder,
}
