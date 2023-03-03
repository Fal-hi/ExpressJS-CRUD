// untuk mengenerate models gunakan perintah "npm run reverse:db"
import { Sequelize } from 'sequelize'
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
)

var DataTypes = require('sequelize').DataTypes
var _customeraccount = require('./customeraccount')
var _customerortail = require('./customerortail')
var _customers = require('./customers')
var _order_details = require('./order_details')
var _orders = require('./orders')
var _product_category = require('./product_category')
var _productdetail = require('./productdetail')
var _products = require('./products')
var _users = require('./users')

function initModels(sequelize) {
  var customeraccount = _customeraccount(sequelize, DataTypes)
  var customerortail = _customerortail(sequelize, DataTypes)
  var customers = _customers(sequelize, DataTypes)
  var order_details = _order_details(sequelize, DataTypes)
  var orders = _orders(sequelize, DataTypes)
  var product_category = _product_category(sequelize, DataTypes)
  var productdetail = _productdetail(sequelize, DataTypes)
  var products = _products(sequelize, DataTypes)
  var users = _users(sequelize, DataTypes)

  order_details.belongsTo(orders, { as: 'order', foreignKey: 'order_id' })
  orders.hasMany(order_details, { as: 'order_details', foreignKey: 'order_id' })
  products.belongsTo(product_category, {
    as: 'category',
    foreignKey: 'category_id',
  })
  product_category.hasMany(products, {
    as: 'products',
    foreignKey: 'category_id',
  })
  order_details.belongsTo(products, { as: 'product', foreignKey: 'product_id' })
  products.hasMany(order_details, {
    as: 'order_details',
    foreignKey: 'product_id',
  })
  customers.belongsTo(users, { as: 'user', foreignKey: 'user_id' })
  users.hasMany(customers, { as: 'customers', foreignKey: 'user_id' })
  orders.belongsTo(users, { as: 'user', foreignKey: 'user_id' })
  users.hasMany(orders, { as: 'orders', foreignKey: 'user_id' })

  return {
    customeraccount,
    customerortail,
    customers,
    order_details,
    orders,
    product_category,
    productdetail,
    products,
    users,
  }
}

const models = initModels(sequelize)
export default models
export { sequelize }
