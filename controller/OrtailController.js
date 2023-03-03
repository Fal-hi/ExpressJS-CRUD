import models from '../models/init-models'

async function findAllOrderDetails(req, res) {
  try {
    const ortail = await models.order_details.findAll()
    res.status(200).send({ message: 'All data order detail', data: ortail })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function createOrderDetail(req, res) {
  const { quantity, order_id, product_id } = req.body
  try {
    const ortail = await models.order_details.create({
      quantity,
      order_id,
      product_id,
    })
    console.log(ortail)
    res
      .status(200)
      .send({ message: 'Successfully create order detail', data: ortail })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function updateOrderDetail(req, res) {
  const { id } = req.params
  const { quantity, order_id, product_id } = req.body
  try {
    const ortail = await models.order_details.create(
      {
        quantity,
        order_id,
        product_id,
      },
      {
        where: { id },
      },
    )
    const updateProCat = await models.orders.findByPk(id)
    ortail[0] === 1
      ? res.status(200).send({
          message: 'Order detail has been updated',
          data: updateProCat,
        })
      : res.status(400).send({ message: 'Order detail not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findOrderDetailById(req, res) {
  const { id } = req.params
  try {
    const ortail = await models.order_details.findByPk(id)
    ortail
      ? res.status(200).send({ data: ortail })
      : res.send({ message: 'Order detail not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function deleteOrderDetail(req, res) {
  const { id } = req.params
  try {
    const ortail = await models.order_details.destroy({
      where: {
        id,
      },
    })
    res
      .status(200)
      .send({ message: 'Order detail has been deleted!', data: ortail })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  findAllOrderDetails,
  createOrderDetail,
  updateOrderDetail,
  findOrderDetailById,
  deleteOrderDetail,
}
