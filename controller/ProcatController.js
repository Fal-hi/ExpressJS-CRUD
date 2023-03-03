import models from '../models/init-models'

async function findAllProCat(req, res) {
  try {
    const result = await models.product_category.findAll()
    res.status(200).send({ message: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function createProCat(req, res) {
  const { name, description } = req.body
  try {
    const result = await models.product_category.create({
      name_category: name,
      description_category: description,
    })
    res.status(200).send({ message: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findProCatByName(req, res) {
  const { name_category } = req.params
  try {
    const procat = await models.product_category.findAll({
      where: {
        name_category,
      },
    })
    procat
      ? res.status(200).send({ data: procat })
      : res.status(400).send({ message: 'Username not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function updateProCat(req, res) {
  const { id } = req.params
  const { name, description } = req.body
  try {
    const result = await models.product_category.update(
      {
        name_category: name,
        description_category: description,
      },
      {
        where: { id },
      },
    )
    const updateProCat = await models.product_category.findByPk(id)
    result[0] === 1
      ? res.status(200).send({
          message: 'Product Category has been updated',
          data: updateProCat,
        })
      : res.status(400).send({ message: 'Product Category not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function findProCatById(req, res) {
  try {
    const procat = await models.product_category.findByPk(req.params.id)
    result
      ? res.status(200).send({ message: procat })
      : res.send({ message: 'Product Category not found' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function deleteProCat(req, res) {
  const { id } = req.params
  try {
    await models.product_category.destroy({
      where: {
        id,
      },
    })
    res.status(200).send({ message: 'Product Category has been deleted!' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  findAllProCat,
  createProCat,
  updateProCat,
  findProCatById,
  findProCatByName,
  deleteProCat,
}
