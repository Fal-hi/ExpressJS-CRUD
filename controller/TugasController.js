// import models from '../models/init-models'
import models from '../models/init-models'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// async function getInfoAccountCustomers(req, res) {
//   try {
//     // ? Cara query
//     // const user = await sequelize.query(
//     //   'SELECT c.customer_id, c.firstname, c.lastname, u.username, u.password FROM customers c INNER JOIN users u ON c.customer_user_id = u.user_id',
//     //   { type: sequelize.QueryTypes.SELECT },
//     // )
//     // ? Cara include
//     // const user = await models.customers.findAll({
//     //   include: { all: true },
//     // })
//     res.status(200).json(user)
//   } catch (error) {
//     res.status(500).json({ message: 'Something wrong!' })
//   }
// }

// ? Menggunakan view
async function getInfoAccountCustomersView(req, res) {
  try {
    const user = await models.customeraccount.findAll()
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// ? Menggunakan include
// async function getCustomerOrderDetails(req, res) {
//   try {
//     const result = await models.customers.findAll({
//       include: [
//         {
//           association: 'user',
//           include: {
//             association: 'orders',
//             // ! error
//             include: {
//               association: 'order_details',
//             },
//           },
//         },
//       ],
//     })
//     res.status(200).send(result)
//   } catch (error) {
//     res.status(400).json({ message: error })
//   }
// }

// ? Menggunakan view di postgres
async function getCustomerOrderDetailsView(req, res) {
  try {
    const result = await models.customerortail.findAll()
    res.status(200).send({ message: result })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// async function getInfoProducts(req, res) {
//   try {
//     // ? Cara query
//     // const user = await sequelize.query(
//     //   'SELECT p.product_id, p.name, p.description, p.price, p.image, pc.name, pc.description FROM products p INNER JOIN product_category pc ON p.product_procat_id = pc.procat_id',
//     //   { type: sequelize.QueryTypes.SELECT },
//     // )
//     // ? Cara include
//     const user = await models.products.findAll({
//       include: { all: true },
//     })
//     res.status(200).json(user)
//   } catch (error) {
//     res.status(500).json({ message: 'Something wrong!' })
//   }
// }

// ? Cara view
async function getInfoProducts(req, res) {
  try {
    const user = await models.productdetail.findAll()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// const upload = multer({
//   dest: 'uploads/',
//   fileFilter: function (req, file, cb) {
//     const extensionFile = path.extname(file.originalname).toLowerCase()
//     if (
//       extensionFile !== '.jpg' &&
//       extensionFile !== '.jpeg' &&
//       extensionFile !== '.png'
//     ) {
//       return cb(new Error('Only jpg, jpeg and png file extension are allowed'))
//     }
//     cb(null, true)
//   },
// })
// async function uploadFile(req, res) {
//   try {
//     const uploadAsync = promisify(upload.single('file'))
//     await uploadAsync(req, res)
//     // change file name to its original name
//     const extensionFile = path.extname(req.file.originalname)
//     const newFileName = `${req.file.filename}${extensionFile}`
//     fs.rename(
//       `uploads/${req.file.filename}`,
//       `uploads/${newFileName}`,
//       (err) => {
//         if (err) throw err
//       },
//     )
//     res.status(200).send({ message: 'File berhasil di upload' })
//   } catch (error) {
//     res.status(400).send({ message: error })
//   }
// }

function showImageProduct(req, res) {
  try {
    // ? __dirname = D:\expressjs\swalayan\controller
    const imagePath = path.join(__dirname, '..', 'uploads', req.params.image)
    res.status(200).sendFile(imagePath)
  } catch (error) {
    res.status(400).send({ message: error })
  }
}
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.round(Math.random() * 1e9)
    console.log(uniqueSuffix)
    const fileExtension = path.parse(file.originalname).ext
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`)
  },
})

function createProduct(req, res) {
  const upload = multer({ storage: storage }).single('image')
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).send(err)
    } else {
      try {
        console.log(req.file)
        const finalImageUrl = `${req.protocol}://${req.get(
          'host',
        )}/products/image/${req.file.filename}`
        const { name, description, price, category_id } = req.body
        const result = await models.products.create({
          name: name,
          description: description,
          price: price,
          image: finalImageUrl,
          category_id: category_id,
        })
        res.status(200).send({ message: result })
      } catch (error) {
        res.status(400).send({ message: error })
      }
    }
  })
}

async function getProducts(req, res) {
  try {
    const result = await models.products.findAll()
    res.status(200).send({ message: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params
    const product = await models.products.findByPk(id)

    if (!product) {
      return res.status(400).send({ message: 'Product not found' })
    }

    const finalImageUrl = product.image

    let url = finalImageUrl.split('/')
    let imageFile = url[url.length - 1]

    const imagePath = path.join(__dirname, '..', 'uploads', imageFile)

    fs.unlink(imagePath, async (err) => {
      if (err && err.code !== 'ENOENT') {
        return res.status(400).send({ message: err })
      }
      const result = await models.products.destroy({
        where: { id },
      })
      res
        .status(200)
        .send({ message: 'Delete products successfully', data: result })
    })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

async function updateProduct(req, res) {
  const upload = multer({ storage: storage }).single('image')
  upload(req, res, async (err) => {
    try {
      const { id } = req.params
      const product = await models.products.findOne({
        where: { id },
      })
      if (!product) {
        res.status(401).send({ message: 'Data gagal di update!' })
      }

      let filename
      if (req.file) {
        filename = req.file.filename
      }

      const productImage = product.image
      const url = productImage.split('/')
      const imageFile = url[url.length - 1]
      const imagesPath = path.join(__dirname, '../uploads', imageFile)

      if (fs.existsSync(imagesPath)) {
        fs.unlink(imagesPath, async (err) => {
          if (err) {
            res.status(400).send({ message: err })
          }
          await product
            .update(
              {
                ...req.body,
                image: filename,
              },
              {
                where: { id },
              },
            )
            .then((data) => {
              res
                .status(200)
                .send({ message: 'Data berhasil di update!', data: data })
            })
        })
      }
    } catch (error) {
      res.status(400).send({ message: error })
    }
  })
}

// const deleteImageInFile = (imagePath) => {
//   fs.unlink(imagePath, (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log('File replace successfully')
//   })
// }

export default {
  getInfoAccountCustomersView,
  getCustomerOrderDetailsView,
  getInfoProducts,
  showImageProduct,
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
}
