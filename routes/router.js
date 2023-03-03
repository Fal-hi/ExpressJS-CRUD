import { Router } from 'express'
import UserController from '../controller/UserController'
import CustomerController from '../controller/CustomerController'
import ProcatController from '../controller/ProcatController'
import ProductController from '../controller/ProductController'
import TugasController from '../controller/TugasController'
import AuthController from '../controller/AuthController'
import OrderController from '../controller/OrderController'
import OrtailController from '../controller/OrtailController'

const router = new Router()

// UserController
router.post('/users/create', UserController.createUser)
router.get('/users', UserController.findAllUsers)
router.get('/users/byid/:id', UserController.findUserById)
router.get('/users/byun/:username', UserController.findUserByUsername)
router.put('/users/edit/:id', UserController.updateUser)
router.delete('/users/delete/:id', UserController.deleteUser)

// CustomerController
router.post('/customers/create', CustomerController.createCustomer)
router.get('/customers', CustomerController.findAllCustomers)
router.get('/customers/byid/:id', CustomerController.findCustomerById)
router.get(
  '/customers/byname/:firstname',
  CustomerController.findCustomerByFirstname,
)
router.put('/customers/edit/:id', CustomerController.updateCustomer)
router.delete('/customers/delete/:id', CustomerController.deleteCustomer)
// find customer account
router.get('/customers/account', CustomerController.getInfoAccountCustomersView)
// find information customer order details
router.get('/customers/ortail', CustomerController.getCustomerOrderDetailsView)

// OrderController
router.post('/orders/create', OrderController.createOrder)
router.get('/orders', OrderController.findAllOrders)
router.get('/orders/byid/:id', OrderController.findOrderById)
router.put('/orders/edit/:id', OrderController.updateOrder)
router.delete('/orders/delete/:id', OrderController.deleteOrder)

// OrderDetailController
router.post('/ortails/create', OrtailController.createOrderDetail)
router.get('/ortails', OrtailController.findAllOrderDetails)
router.get('/ortails/byid/:id', OrtailController.findOrderDetailById)
router.put('/ortails/edit/:id', OrtailController.updateOrderDetail)
router.delete('/ortails/delete/:id', OrtailController.deleteOrderDetail)

// ProCatController
router.post('/procats/create', ProcatController.createProCat)
router.get('/procats', ProcatController.findAllProCat)
router.get('/procats/byid/:id', ProcatController.findProCatById)
router.get('/procats/byname/:name_category', ProcatController.findProCatByName)
router.put('/procats/edit/:id', ProcatController.updateProCat)
router.delete('/procats/delete/:id', ProcatController.deleteProCat)

// ProductsController
router.post('/products/create', ProductController.createProduct)
router.get('/products', ProductController.findAllProducts)
router.get('/products/byid/:id', ProductController.findProductById)
router.put('/products/edit/:id', ProductController.updateProduct)
router.delete('/products/delete/:id', ProductController.deleteProduct)
router.get('/products/image/:image', ProductController.showImageProduct)
// find product per category
router.get('/products/details', ProductController.getInfoProductDetails)

// AuthController
// register
router.post('users/register', AuthController.registerUser)
// login
router.post('users/login', AuthController.loginUser)
// check token
router.get(
  'customer/account',
  AuthController.checkToken,
  CustomerController.getInfoAccountCustomersView,
)
router.get(
  '/customer/order',
  AuthController.checkToken,
  CustomerController.getCustomerOrderDetailsView,
)

export default router

// // find customer account
// router.get('/customerdetail', TugasController.getInfoAccountCustomersView)
// // show image
// router.get('/products/image/:image', TugasController.showImageProduct)
// // create products
// router.post('/productsitem', TugasController.createProduct)
// // get products
// router.get('/productsitem', TugasController.getProducts)
// // delete products
// router.delete('/productsitem/:id', TugasController.deleteProduct)
// // update products
// router.put('/productsitem/:id', TugasController.updateProduct)
// // find information customer and order detail
// router.get('/customerortail', TugasController.getCustomerOrderDetailsView)
// // check token
// router.get(
//   '/customerinfo',
//   AuthController.checkToken,
//   TugasController.getInfoAccountCustomersView,
// )
// router.get(
//   '/customerorder',
//   AuthController.checkToken,
//   TugasController.getCustomerOrderDetailsView,
// )
